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
	lstsvToXlsform,
	parseLstsv,
	validateLstsvSubset,
	xlsformToLstsv
} from '@correlaid/formtransform';
import {
	XLSFormGenerator,
	XLSFormValidator,
	assembleSurvey,
	demographicQuestions,
	extractQuestions,
	type Question,
	type Survey
} from '../../src/lib/agents/index.js';
import { demographicVariables } from '../../src/lib/constants.js';
import {
	findFollowUps,
	openQuestions,
	orphanedFollowUps,
	unconditionedQuestions
} from '../../src/lib/agents/follow_ups.js';
import { doubleBarrelled } from '../../src/lib/agents/wording.js';

const FIXTURES = join(import.meta.dirname, 'fixtures');
const OUTPUT = join(import.meta.dirname, 'output');

interface Fixture {
	description: string;
	source: string;
	title?: string;
	researchQuestions: string[];
	/** Survey language; the fixtures so far are German. */
	language?: 'de' | 'en';
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
			language: fixture.language ?? 'de',
			researchQuestions: fixture.researchQuestions
		},
		extractQuestions(fixture.generated),
		demographicQuestions(demographics)
	);
	const demographicIds = new Set(demographicQuestions(demographics).map((q) => q.id));
	const workbook = new XLSFormGenerator().generate(survey);
	const buffer = workbook.buffer.slice(
		workbook.byteOffset,
		workbook.byteOffset + workbook.byteLength
	) as ArrayBuffer;
	// With validation on: a form outside the subset is rejected here, as it
	// would be in any other converter.
	const convert = () => xlsformToLstsv(buffer);
	const withChoices = survey.questions.filter((q) => q.choices?.length);

	it('writes the workbook for the pyxform check', () => {
		writeFileSync(join(OUTPUT, `${name}.xlsx`), workbook);
		expect(survey.questions.length).toBeGreaterThan(0);
	});

	it('links follow-ups and records what the quality checks still find', () => {
		const own = survey.questions.filter((q) => !demographicIds.has(q.id));
		// Every follow-up the code could link has its relevant now.
		for (const f of findFollowUps(own)) {
			if (f.parent && f.codes.length === 1) {
				expect(own[f.index].relevant, `relevant of ${own[f.index].name}`).toBeTruthy();
			}
		}
		// What would go to the repair: a change here shows up in the diff.
		expect({
			orphanedFollowUps: orphanedFollowUps(own).map((q) => q.name),
			unconditioned: unconditionedQuestions(own).map((q) => q.name),
			open: openQuestions(own).map((q) => q.name),
			doubleBarrelled: doubleBarrelled(own).map((q) => q.name)
		}).toMatchSnapshot();
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
		// The survey's base language comes from settings default_language.
		const language = rows.find((r) => r.class === 'S' && r.name === 'language');
		expect(language?.text).toBe(fixture.language ?? 'de');

		const converted = questionsOf(rows);
		// formtransform turns these two notes into LimeSurvey's welcome and end
		// texts (assembleSurvey names them so).
		const texts = { welcome: 'surveyls_welcometext', end: 'surveyls_endtext' } as const;
		for (const [note, setting] of Object.entries(texts)) {
			if (!survey.questions.some((q) => q.name === note)) continue;
			expect(rows.some((r) => r.class === 'SL' && r.name === setting && r.text)).toBe(true);
		}
		// A `<q>_other` pair becomes LimeSurvey's own "other" field: the parent
		// gets other = Y, its `other` answer and the companion question go.
		const names = new Set(survey.questions.map((q) => q.name));
		const hasOtherField = (q: Question) => names.has(`${q.name}_other`);
		for (const q of survey.questions) {
			if (q.type === 'note' && q.name in texts) continue;
			const parent = q.name.endsWith('_other') ? q.name.slice(0, -'_other'.length) : null;
			if (parent && names.has(parent)) {
				expect(converted.has(q.name), `${q.name} folded into ${parent}`).toBe(false);
				expect(converted.get(parent)?.row.other, `other field of ${parent}`).toBe('Y');
				continue;
			}
			const target = converted.get(q.name);
			expect(target, `question ${q.name}`).toBeDefined();
			if (q.choices?.length) {
				const codes = q.choices
					.map((c) => c.name)
					.filter((c) => !(hasOtherField(q) && c === 'other'));
				expect(target!.codes, `answer codes of ${q.name}`).toEqual(codes);
			}
			if (q.relevant) {
				expect(target!.row.relevance, `relevance of ${q.name}`).not.toMatch(/^1?$/);
			}
		}
	});

	const otherPairs = survey.questions.filter(
		(q) => q.name.endsWith('_other') && survey.questions.some((p) => `${p.name}_other` === q.name)
	);
	// The companion folds into LimeSurvey's own "other" field: no separate
	// question, and its label becomes the parent's other_replace_text, the label
	// of LimeSurvey's "other" text box (CorrelAid/formtransform#79, v0.2.1).
	it.runIf(otherPairs.length > 0)('folds <q>_other companions into the other field', async () => {
		const converted = questionsOf(parseLstsv(await convert()));
		for (const q of otherPairs) {
			expect(converted.has(q.name.replace('_other', 'other')), `${q.name} emitted`).toBe(false);
			const parent = converted.get(q.name.slice(0, -'_other'.length));
			expect(parent?.row.other_replace_text, `label of ${q.name}`).toBe(q.label);
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

	// Only select_multiple carries the flag (LimeSurvey's exclude_all_others).
	const exclusive = withChoices.filter(
		(q) => q.type.startsWith('select_multiple') && q.choices!.some((c) => c.exclusive)
	);
	// formtransform maps the flag to LimeSurvey's exclude_all_others and back
	// (CorrelAid/formtransform#53, v0.1.7).
	it.runIf(exclusive.length > 0)('keeps exclusive answers exclusive', async () => {
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
