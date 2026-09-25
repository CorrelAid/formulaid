import { LeadAgent, createModel, fileNameFor } from '../src/lib/agents/index.js';
import { OPENROUTER_API_URL } from '../src/lib/constants.js';
import type { AgentInput } from '../src/lib/agents/types.js';
import { CHAT_MODEL } from '../src/lib/constants.js';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = process.env.TEST_OUTPUT_DIR ?? join(import.meta.dir, 'test_output');
mkdirSync(OUTPUT_DIR, { recursive: true });

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.TEST_MODEL ?? CHAT_MODEL;

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
			]
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
			demographicQuestions: []
		}
	},
	{
		label: 'Wirkungsmessung NGO (formal, kein Kontext)',
		input: {
			researchQuestion: 'Welche Wirkung hat das Bildungsprogramm auf die Teilnehmenden?',
			language: 'formal',
			selectedDemographics: ['school_education'],
			demographicQuestions: []
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

	const ai = createModel(API_KEY!, MODEL, OPENROUTER_API_URL);
	const agent = new LeadAgent(ai);

	const start = Date.now();
	const { survey, workbook, findings, repairAttempts, qwacAvailable, bankSearch } = await agent.run(
		input,
		{
			onPhase: (p) => console.log(`  [phase] ${p.phase}${'attempt' in p ? ` ${p.attempt}` : ''}`)
		}
	);
	const fromBank = survey.questions.filter((q) => q.source && q.source !== 'generated').length;

	const elapsed = ((Date.now() - start) / 1000).toFixed(1);
	console.log(`\nGenerated "${survey.title}": ${survey.questions.length} questions in ${elapsed}s`);
	const { promptTokens, completionTokens } = agent.usage();
	console.log(
		`  repairs: ${repairAttempts}, qwac: ${qwacAvailable ? 'yes' : 'unavailable'}, from bank: ${fromBank}`
	);
	console.log(`  tokens: ${promptTokens} in, ${completionTokens} out`);
	console.log(`  keywords: ${bankSearch.keywords.join(', ')}`);
	for (const h of bankSearch.hits) console.log(`  hit ${h.id}: ${h.concept} | ${h.question}`);
	for (const f of findings) console.log(`  [${f.severity}] ${f.message}`);
	console.log();

	for (const q of survey.questions) {
		const choices = q.choices?.length ? ` [${q.choices.map((c) => c.label).join(' / ')}]` : '';
		const source = q.source && q.source !== 'generated' ? ` (${q.source})` : '';
		console.log(`  [${q.type}] ${q.label}${choices}${source}`);
	}

	const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '_');
	const dir = join(OUTPUT_DIR, slug);
	mkdirSync(dir, { recursive: true });
	writeFileSync(join(dir, fileNameFor(survey)), workbook);
	writeFileSync(join(dir, 'questions.json'), JSON.stringify(survey.questions, null, 2));
	console.log(`\nSaved to scripts/test_output/${slug}/`);
	console.log(`  ${fileNameFor(survey)}  (${workbook.length} bytes)`);
	console.log(`  questions.json      (${survey.questions.length} questions)`);
}

// TEST_CASE=2 runs only the second case, to keep real API costs down.
const only = process.env.TEST_CASE ? Number(process.env.TEST_CASE) : null;
for (const [i, { label, input }] of testCases.entries()) {
	if (only !== null && i + 1 !== only) continue;
	try {
		await runCase(label, input);
	} catch (e) {
		console.error(`FAILED: ${label}\n`, e);
	}
}

console.log('\n' + '═'.repeat(60));
console.log('Done.');
