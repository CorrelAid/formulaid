import { LeadAgent, createModel, XLSFormGenerator } from '../src/lib/agents/index.js';
import type { AgentInput } from '../src/lib/agents/types.js';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = join(import.meta.dir, 'test_output');
mkdirSync(OUTPUT_DIR, { recursive: true });

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.TEST_MODEL ?? 'mistralai/mistral-small-2603';

if (!API_KEY) {
	console.error('OPENROUTER_API_KEY not set');
	process.exit(1);
}

const testCases: Array<{ label: string; input: AgentInput }> = [
	{
		label: 'Mitarbeiterzufriedenheit (formal)',
		input: {
			researchQuestion: 'Wie zufrieden sind die Mitarbeitenden mit der Arbeit im Homeoffice?',
			targetGroup: 'Mitarbeitende eines mittelständischen IT-Unternehmens',
			useOfResults: 'Interner HR-Bericht zur Verbesserung der Remote-Work-Richtlinien',
			language: 'formal',
			selectedDemographics: ['age', 'employment_status'],
			demographicQuestions: [
				{
					id: 'bda5c010ec81',
					name: 'age',
					label: 'Wann sind Sie geboren?',
					type: 'date',
					choices: [],
					required: true
				}
			],
			contextQuestions: []
		}
	},
	{
		label: 'Vereinsmitglieder-Bedarfserhebung (informal)',
		input: {
			researchQuestion: 'Was brauchen Vereinsmitglieder, um aktiver mitzumachen?',
			targetGroup: 'Aktive und passive Mitglieder eines Sportvereins',
			useOfResults: 'Vorstandspräsentation und Entscheidungsgrundlage für Jahresplanung',
			language: 'informal',
			selectedDemographics: [],
			demographicQuestions: [],
			contextQuestions: []
		}
	},
	{
		label: 'Wirkungsmessung NGO (formal, kein Kontext)',
		input: {
			researchQuestion: 'Welche Wirkung hat das Bildungsprogramm auf die Teilnehmenden?',
			language: 'formal',
			selectedDemographics: ['school_education'],
			demographicQuestions: [],
			contextQuestions: []
		}
	}
];

async function runCase(label: string, input: AgentInput) {
	console.log('\n' + '═'.repeat(60));
	console.log(`TEST: ${label}`);
	console.log('─'.repeat(60));
	console.log('Input:');
	console.log(`  Forschungsfrage: ${input.researchQuestion}`);
	if (input.targetGroup) console.log(`  Zielgruppe:      ${input.targetGroup}`);
	if (input.useOfResults) console.log(`  Verwendung:      ${input.useOfResults}`);
	console.log(`  Sprache:         ${input.language}`);
	console.log(`  Demografik:      ${input.selectedDemographics.join(', ') || 'keine'}`);
	console.log('─'.repeat(60));

	const ai = createModel(API_KEY!, MODEL);
	const agent = new LeadAgent(ai);

	const start = Date.now();
	const survey = await agent.buildSurvey(
		input,
		(status) => console.log(`  [status] ${status}`),
		() => {}
	);

	const elapsed = ((Date.now() - start) / 1000).toFixed(1);
	console.log(`\nGenerated ${survey.questions.length} questions in ${elapsed}s:\n`);

	for (const q of survey.questions) {
		const choices = q.choices?.length ? ` [${q.choices.map(c => c.label).join(' / ')}]` : '';
		console.log(`  [${q.type}] ${q.label}${choices}`);
	}

	const generator = new XLSFormGenerator();
	const buffer = generator.generate(survey);

	const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '_');
	const dir = join(OUTPUT_DIR, slug);
	mkdirSync(dir, { recursive: true });
	writeFileSync(join(dir, 'questionnaire.xlsx'), buffer);
	writeFileSync(join(dir, 'questions.json'), JSON.stringify(survey.questions, null, 2));
	console.log(`\nSaved to scripts/test_output/${slug}/`);
	console.log(`  questionnaire.xlsx  (${buffer.length} bytes)`);
	console.log(`  questions.json      (${survey.questions.length} questions)`);
}

for (const { label, input } of testCases) {
	try {
		await runCase(label, input);
	} catch (e) {
		console.error(`FAILED: ${label}\n`, e);
	}
}

console.log('\n' + '═'.repeat(60));
console.log('Done.');
