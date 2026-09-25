/**
 * Layer 1 end-to-end tests: every fixture in ./fixtures goes through the same
 * code as a real run after the model step (parse → assemble → workbook), then
 * through formtransform to a LimeSurvey TSV and back. The workbooks are also
 * written to ./output, where test_pyxform.py checks them the way Kobo does.
 *
 * No model, no network: fixtures are either hand-written for a known problem
 * or saved from real runs with `bun scripts/test_workflow.ts --save-fixture`.
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
	XLSFormToTSVConverter,
	XLSLoader,
	lstsvToXlsform,
	parseLstsv,
	validateLstsvSubset
} from '@correlaid/formtransform';
import {
	XLSFormGenerator,
	XLSFormValidator,
	assembleSurvey,
	demographicQuestions,
	extractQuestions,
	type Survey
} from '../../src/lib/agents/index.js';
import { demographicVariables } from '../../src/lib/constants.js';

const FIXTURES = join(import.meta.dirname, 'fixtures');
const OUTPUT = join(import.meta.dirname, 'output');

interface Fixture {
	description: string;
	source: string;
	title?: string;
	researchQuestions: string[];
	/** Demographic question names, or "all". */
	demographics?: string[] | 'all';
	/** `generatedQuestions` as the model returned it. */
	generated: unknown;
}

type Row = Record<string, string>;

/** Each Q row of a LimeSurvey TSV with the answer (A) and subquestion (SQ)
 *  codes that follow it. */
function questionsOf(rows: Row[]): Map<string, { row: Row; codes: string[] }> {
	const out = new Map<string, { row: Row; codes: string[] }>();
	let current: { row: Row; codes: string[] } | null = null;
	for (const row of rows) {
		if (row.class === 'Q') {
			current = { row, codes: [] };
			out.set(row.name, current);
		} else if ((row.class === 'A' || row.class === 'SQ') && current) {
			current.codes.push(row.name);
		} else if (row.class === 'G') {
			current = null;
		}
	}
	return out;
}

const listOf = (type: string) => type.split(' ')[1];

const fixtures = readdirSync(FIXTURES)
	.filter((f) => f.endsWith('.json'))
	.map((f) => ({
		name: f.replace(/\.json$/, ''),
		fixture: JSON.parse(readFileSync(join(FIXTURES, f), 'utf8')) as Fixture
	}));

beforeAll(() => mkdirSync(OUTPUT, { recursive: true }));

describe.each(fixtures)('$name', ({ name, fixture }) => {
	const demographics =
		fixture.demographics === 'all'
			? demographicVariables.map((v) => v.question_name)
			: (fixture.demographics ?? []);
	const survey: Survey = assembleSurvey(
		{
			title: fixture.title ?? name,
			// Fixed, so outputs are comparable between runs.
			formId: `e2e_${name.replace(/[^a-z0-9]+/g, '_')}`,
			researchQuestions: fixture.researchQuestions
		},
		extractQuestions(fixture.generated),
		demographicQuestions(demographics)
	);
	const workbook = new XLSFormGenerator().generate(survey);
	const buffer = workbook.buffer.slice(
		workbook.byteOffset,
		workbook.byteOffset + workbook.byteLength
	) as ArrayBuffer;
	const convert = async () => {
		const parsed = XLSLoader.parseXLSData(buffer);
		return new XLSFormToTSVConverter().convert(
			parsed.surveyData,
			parsed.choicesData,
			parsed.settingsData
		);
	};
	const withChoices = survey.questions.filter((q) => q.choices?.length);

	it('writes the workbook for the pyxform check', () => {
		writeFileSync(join(OUTPUT, `${name}.xlsx`), workbook);
		expect(survey.questions.length).toBeGreaterThan(0);
	});

	it('passes the formtransform validator', () => {
		const findings = new XLSFormValidator().validate(workbook);
		expect(findings.filter((f) => f.severity === 'error')).toEqual([]);
		// A new warning shows up in the snapshot diff.
		expect(findings.map((f) => f.message)).toMatchSnapshot();
	});

	it('converts to a LimeSurvey TSV without losing questions, answers or logic', async () => {
		const rows = parseLstsv(await convert());
		expect(validateLstsvSubset(rows)).toEqual([]);

		const converted = questionsOf(rows);
		// formtransform turns these two notes into LimeSurvey's welcome and end
		// texts (assembleSurvey names them so).
		const texts = { welcome: 'surveyls_welcometext', end: 'surveyls_endtext' } as const;
		for (const [note, setting] of Object.entries(texts)) {
			if (!survey.questions.some((q) => q.name === note)) continue;
			expect(rows.some((r) => r.class === 'SL' && r.name === setting && r.text)).toBe(true);
		}
		for (const q of survey.questions) {
			if (q.type === 'note' && q.name in texts) continue;
			const target = converted.get(q.name);
			expect(target, `question ${q.name}`).toBeDefined();
			if (q.choices?.length) {
				expect(target!.codes, `answer codes of ${q.name}`).toEqual(q.choices.map((c) => c.name));
			}
			if (q.relevant) {
				expect(target!.row.relevance, `relevance of ${q.name}`).not.toMatch(/^1?$/);
			}
		}
	});

	it('round-trips back to XLSForm with the same questions and codes', async () => {
		const back = lstsvToXlsform(await convert());
		const names = back.survey.map((r) => r.name).filter(Boolean);
		expect(names).toEqual(survey.questions.map((q) => q.name));
		for (const q of withChoices) {
			const row = back.survey.find((r) => r.name === q.name)!;
			const codes = back.choices
				.filter((c) => c.list_name === listOf(String(row.type)))
				.map((c) => String(c.name));
			expect(codes, `answer codes of ${q.name}`).toEqual(q.choices!.map((c) => c.name));
		}
	});

	const exclusive = withChoices.filter((q) => q.choices!.some((c) => c.exclusive));
	// Known gap: formtransform ignores the exclusive column and can't convert
	// the count-selected() constraint either (CorrelAid/formtransform#53).
	// When that is fixed this test starts passing, and it.fails turns red:
	// switch it to it() then.
	it.runIf(exclusive.length > 0).fails('keeps exclusive answers exclusive', async () => {
		const back = lstsvToXlsform(await convert());
		for (const q of exclusive) {
			const row = back.survey.find((r) => r.name === q.name)!;
			const flagged = back.choices
				.filter((c) => c.list_name === listOf(String(row.type)))
				.filter((c) => (c as Row).exclusive === 'yes')
				.map((c) => String(c.name));
			expect(flagged).toEqual(q.choices!.filter((c) => c.exclusive).map((c) => c.name));
		}
	});
});
