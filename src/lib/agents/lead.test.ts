import { describe, it, expect, vi } from 'vitest';
import { AxMockAIService, type AxChatRequest } from '@ax-llm/ax';
import {
	LeadAgent,
	MAX_REPAIR_ATTEMPTS,
	assembleSurvey,
	dedupAgainstDemographics,
	looksLikeFollowUp,
	qualityFeedback
} from './lead.js';
import { XLSFormValidator, type ValidationFinding } from './xlsform_validator.js';
import type { AgentInput, Question } from './types.js';

vi.mock('./qwacback.js', () => ({
	searchQuestionBank: async () => ({ hits: [], available: false }),
	renderBankHits: () => ''
}));

const input: AgentInput = {
	researchQuestions: ['Wie zufrieden sind Ehrenamtliche?'],
	language: 'formal',
	surveyLanguage: 'de',
	selectedDemographics: [],
	demographicQuestions: [
		{ id: 'd1', name: 'age', label: 'Alter?', type: 'integer', required: true }
	]
};

const scale = [1, 2, 3, 4, 5].map((n) => ({ name: `s${n}`, label: String(n) }));
/** Passes the validator and the quality checks: 8 closed questions. */
const good: Partial<Question>[] = Array.from({ length: 8 }, (_, i) => ({
	name: `item${i + 1}`,
	label: `Frage ${i + 1}?`,
	type: 'select_one',
	choices: scale,
	rationale: 'Kern'
}));
const rejected: ValidationFinding = { severity: 'error', message: 'rejected for the test' };

/** After parsing and sanitizing, hardly anything still fails the validator,
 *  so the repair tests make it reject the first `n` workbooks. */
function rejectFirst(n: number) {
	const real = XLSFormValidator.prototype.validate;
	let calls = 0;
	return vi.spyOn(XLSFormValidator.prototype, 'validate').mockImplementation(function (
		this: XLSFormValidator,
		bytes: Uint8Array
	) {
		return calls++ < n ? [rejected] : real.call(this, bytes);
	});
}

/** Answers as the keyword step, the generator or the repair agent, depending
 *  on the prompt. Keyword calls aren't counted. */
function mockAI(generated: Partial<Question>[], repaired: Partial<Question>[]) {
	const calls = { generate: 0, repair: 0 };
	const ai = new AxMockAIService<string>({
		features: { functions: true, streaming: false },
		chatResponse: async (req: Readonly<AxChatRequest<unknown>>) => {
			const first = req.chatPrompt[0];
			const system = first && 'content' in first ? String(first.content) : '';
			if (system.includes('You pick search terms')) {
				const content = 'Keywords: ["Zufriedenheit", "Engagement"]';
				return { results: [{ index: 0, content, finishReason: 'stop' as const }] };
			}
			const isRepair = system.includes('You repair');
			if (isRepair) calls.repair++;
			else calls.generate++;
			const content = isRepair
				? `Generated Questions: ${JSON.stringify(repaired)}`
				: `Title: Zufriedenheit im Ehrenamt\nReasoning: Test\nGenerated Questions: ${JSON.stringify(generated)}`;
			return { results: [{ index: 0, content, finishReason: 'stop' as const }] };
		}
	});
	return { ai, calls };
}

describe('LeadAgent.run', () => {
	it('delivers a valid questionnaire without repairing it', async () => {
		const { ai, calls } = mockAI(good, []);
		const result = await new LeadAgent(ai).run(input);

		expect(calls).toEqual({ generate: 1, repair: 0 });
		expect(result.findings.filter((f) => f.severity === 'error')).toEqual([]);
		expect(result.survey.title).toBe('Zufriedenheit im Ehrenamt');
		expect(result.survey.formId).toMatch(/^zufriedenheit_im_ehrenamt_\d{12}$/);
		// Demographics last.
		expect(result.survey.questions.map((q) => q.name).slice(-2)).toEqual(['item8', 'age']);
		expect(result.qwacAvailable).toBe(false);
	});

	it('repairs the previous questions instead of regenerating', async () => {
		const spy = rejectFirst(1);
		const { ai, calls } = mockAI(good, good);
		const result = await new LeadAgent(ai).run(input);
		spy.mockRestore();

		expect(calls).toEqual({ generate: 1, repair: 1 });
		expect(result.repairAttempts).toBe(1);
		expect(result.findings.filter((f) => f.severity === 'error')).toEqual([]);
	});

	it('repairs a questionnaire that is too short, without reporting it as a finding', async () => {
		const { ai, calls } = mockAI(good.slice(0, 3), good);
		const result = await new LeadAgent(ai).run(input);

		expect(calls).toEqual({ generate: 1, repair: 1 });
		expect(result.survey.questions).toHaveLength(9);
		expect(result.findings).toEqual([]);
	});

	it('keeps the previous version when a repair makes it worse', async () => {
		// 6 questions are too few; the "repair" drops to 2.
		const { ai, calls } = mockAI(good.slice(0, 6), good.slice(0, 2));
		const result = await new LeadAgent(ai).run(input);

		expect(calls.repair).toBe(MAX_REPAIR_ATTEMPTS);
		expect(result.survey.questions).toHaveLength(7);
	});

	it('stops after MAX_REPAIR_ATTEMPTS and returns the remaining findings', async () => {
		const spy = rejectFirst(Infinity);
		const { ai, calls } = mockAI(good, good);
		const result = await new LeadAgent(ai).run(input);
		spy.mockRestore();

		expect(calls.repair).toBe(MAX_REPAIR_ATTEMPTS);
		expect(result.repairAttempts).toBe(MAX_REPAIR_ATTEMPTS);
		expect(result.findings).toEqual([rejected]);
	});

	it('repairs until every research question is covered (#34)', async () => {
		const two = { ...input, researchQuestions: ['Wie zufrieden?', 'Was fehlt?', ''] };
		const onlyFirst = good.map((q) => ({ ...q, researchQuestions: [1] }));
		const both = good.map((q, i) => ({ ...q, researchQuestions: [i < 4 ? 1 : 2] }));
		const { ai, calls } = mockAI(onlyFirst, both);
		const result = await new LeadAgent(ai).run(two);

		expect(calls).toEqual({ generate: 1, repair: 1 });
		// The empty third entry is dropped.
		expect(result.survey.researchQuestions).toEqual(['Wie zufrieden?', 'Was fehlt?']);
		expect(result.survey.questions.at(-2)?.researchQuestions).toEqual([2]);
	});

	it('maps every question to a single research question', async () => {
		const { ai } = mockAI(good, []);
		const result = await new LeadAgent(ai).run(input);
		expect(result.survey.questions[0].researchQuestions).toEqual([1]);
	});

	it('rejects when the run is cancelled', async () => {
		const { ai } = mockAI(good, []);
		const controller = new AbortController();
		controller.abort();
		await expect(new LeadAgent(ai).run(input, { signal: controller.signal })).rejects.toThrow();
	});

	it('forwards furtherNotes to the keyword and generator steps (#40)', async () => {
		const seen: string[] = [];
		const ai = new AxMockAIService<string>({
			features: { functions: true, streaming: false },
			chatResponse: async (req: Readonly<AxChatRequest<unknown>>) => {
				const first = req.chatPrompt[0];
				const system = first && 'content' in first ? String(first.content) : '';
				seen.push(system);
				if (system.includes('You pick search terms')) {
					return {
						results: [
							{
								index: 0,
								content: 'Keywords: ["Zufriedenheit"]',
								finishReason: 'stop' as const
							}
						]
					};
				}
				return {
					results: [
						{
							index: 0,
							content: `Title: Test\nReasoning: ok\nGenerated Questions: ${JSON.stringify(good)}`,
							finishReason: 'stop' as const
						}
					]
				};
			}
		});
		await new LeadAgent(ai).run({ ...input, furtherNotes: 'Avoid double-barrelled questions.' });
		// Both prompts see the user's note, in addition to the standard instructions.
		expect(seen.some((s) => s.includes('furtherNotes'))).toBe(true);
	});

	it('passes surveyLanguage through to the generator prompt (#39)', async () => {
		const rendered: string[] = [];
		const ai = new AxMockAIService<string>({
			features: { functions: true, streaming: false },
			chatResponse: async (req: Readonly<AxChatRequest<unknown>>) => {
				const first = req.chatPrompt[0];
				const system = first && 'content' in first ? String(first.content) : '';
				rendered.push(system);
				if (system.includes('You pick search terms')) {
					return {
						results: [
							{
								index: 0,
								content: 'Keywords: ["satisfaction"]',
								finishReason: 'stop' as const
							}
						]
					};
				}
				return {
					results: [
						{
							index: 0,
							content: `Title: Test\nReasoning: ok\nGenerated Questions: ${JSON.stringify(good)}`,
							finishReason: 'stop' as const
						}
					]
				};
			}
		});
		await new LeadAgent(ai).run({ ...input, surveyLanguage: 'en' });
		// The generator step is the one that needs the language, so it sees it
		// in its rendered prompt (system or user message).
		expect(rendered.some((s) => s.includes('Survey Language'))).toBe(true);
	});

	/** End-to-end regression for the user's Kobo import bug (#47 follow-up):
	 *  the model writes a Sonstiges text follow-up without `relevant`, the
	 *  quality loop flags it, the repair agent adds the right expression.
	 *  Without this loop, the file passes the validator and ships with no
	 *  skip-logic, so Kobo shows the follow-up to everyone. */
	it('repairs a Sonstiges follow-up that lacks `relevant` (#47 follow-up)', async () => {
		const parent: Partial<Question> = {
			name: 'bereich',
			label: 'In welchen Bereichen?',
			type: 'select_multiple',
			rationale: 'Anwendungsbereiche',
			choices: [
				{ name: 'lokal', label: 'Lokal' },
				{ name: 'sonst', label: 'Sonstiges' }
			]
		};
		const broken: Partial<Question> = {
			name: 'bereich_sonstiges',
			label: 'Falls Sonstiges: bitte angeben',
			type: 'text'
			// no relevant, no rationale → quality loop must catch it
		};
		const fixed: Partial<Question> = {
			name: 'bereich_sonstiges',
			label: 'Falls Sonstiges: bitte angeben',
			type: 'text',
			relevant: "selected(${bereich}, 'sonst')",
			rationale: 'Ergänzung zu Sonstiges'
		};
		const generated: Partial<Question>[] = [parent, broken, ...good.slice(0, 7)];
		const { ai, calls } = mockAI(generated, [parent, fixed, ...good.slice(0, 7)]);
		const result = await new LeadAgent(ai).run(input);

		// The repair loop fired because the quality check flagged the broken follow-up.
		expect(calls.repair).toBeGreaterThanOrEqual(1);
		// The repaired follow-up is the one shipped — with its `relevant` set.
		// (Name is sanitized: `bereich_sonstiges` -> `bereichsonstiges`.)
		const followup = result.survey.questions.find((q) => /^bereich.*sonstiges$/.test(q.name));
		expect(followup?.relevant).toBe("selected(${bereich}, 'sonst')");
	});

	/** The model is told `demographicsAddedSeparately`, but it still writes a
	 *  birth-date question and names it `age` sometimes. Without dedup the
	 *  survey ends up with two `age` rows and the same "Wann sind Sie
	 *  geboren?" label (#47 follow-up). */
	it('drops a generated question whose name collides with a demographic (#47)', async () => {
		const dup: Partial<Question>[] = [
			{ name: 'age', label: 'Wann sind Sie geboren?', type: 'date', rationale: 'selbst' },
			...good.slice(0, 7)
		];
		const { ai } = mockAI(dup, []);
		const result = await new LeadAgent(ai).run({
			...input,
			selectedDemographics: ['age'],
			demographicQuestions: [
				{
					id: 'qwac_age',
					name: 'age',
					label: 'Wann sind Sie geboren?',
					type: 'date',
					required: true
				}
			]
		});
		// Exactly one `age` survives: the qwac copy appended by assembleSurvey.
		const ages = result.survey.questions.filter((q) => q.name === 'age' || /^age\d/.test(q.name));
		expect(ages).toHaveLength(1);
		expect(ages[0].id).toBe('qwac_age');
	});
});

describe('dedupAgainstDemographics', () => {
	const age: Question = {
		id: 'qwac_age',
		name: 'age',
		label: 'Wann sind Sie geboren?',
		type: 'date',
		required: true
	};
	const sex: Question = {
		id: 'qwac_sex',
		name: 'sex',
		label: 'Geschlecht?',
		type: 'select_one',
		required: true,
		choices: []
	};

	it('returns the list unchanged when there are no demographics', () => {
		const generated: Question[] = [
			{ id: 'g1', name: 'age', label: 'l', type: 'text', required: true }
		];
		expect(dedupAgainstDemographics(generated, [])).toBe(generated);
	});

	it('drops a generated question whose name matches any demographic name', () => {
		const generated: Question[] = [
			{ id: 'g1', name: 'age', label: 'l', type: 'text', required: true, rationale: 'x' },
			{ id: 'g2', name: 'satisfaction', label: 'l', type: 'text', required: true, rationale: 'x' }
		];
		expect(dedupAgainstDemographics(generated, [age, sex]).map((q) => q.name)).toEqual([
			'satisfaction'
		]);
	});

	it('keeps generated questions whose name does not collide', () => {
		const generated: Question[] = [
			{ id: 'g1', name: 'satisfaction', label: 'l', type: 'text', required: true, rationale: 'x' },
			{ id: 'g2', name: 'birthyear', label: 'l', type: 'text', required: true, rationale: 'x' }
		];
		expect(dedupAgainstDemographics(generated, [age, sex])).toEqual(generated);
	});
});

describe('qualityFeedback', () => {
	it('asks for more questions and fewer open ones', () => {
		const open = Array.from({ length: 5 }, (_, i) => ({
			id: String(i),
			name: `open${i}`,
			label: 'Warum?',
			type: 'text' as const,
			required: false
		}));
		const note = { id: 'n', name: 'intro', label: 'Hallo', type: 'note' as const, required: false };
		const feedback = qualityFeedback([note, ...open]);
		expect(feedback).toHaveLength(2);
		expect(feedback[0]).toContain('Only 5 answerable');
		expect(feedback[1]).toContain('open0');
	});

	it('names research questions no question serves', () => {
		const q = { id: '1', name: 'a', label: 'A?', type: 'text' as const, required: false };
		const feedback = qualityFeedback([{ ...q, researchQuestions: [1, 3] }], 3);
		expect(feedback[0]).toContain('Research question 2 is not covered');
	});

	/** Follow-ups without `relevant` are the bug from the user's Kobo import
	 *  (#47 follow-up): Kobo showed the Sonstiges text to everyone because
	 *  the file had no skip-logic. The validator can't catch this (it doesn't
	 *  parse `relevant`), so `qualityFeedback` routes it through the repair
	 *  loop. */
	it('flags a Sonstiges follow-up that has no relevant (#47 follow-up)', () => {
		const parent: Question = {
			id: 'p1',
			name: 'bereich',
			label: 'Bereich',
			type: 'select_multiple',
			required: true,
			choices: [],
			rationale: 'kern'
		};
		const orphaned: Question = {
			id: 'f1',
			name: 'bereich_sonstiges',
			label: 'Falls Sonstiges: bitte angeben',
			type: 'text',
			required: false
		};
		const filler = Array.from({ length: 7 }, (_, i) => ({
			id: `f${i}`,
			name: `q${i}`,
			label: `Frage ${i}?`,
			type: 'text' as const,
			required: true,
			rationale: 'kern'
		}));
		const feedback = qualityFeedback([parent, orphaned, ...filler]);
		expect(feedback.some((m) => m.includes('bereich_sonstiges'))).toBe(true);
	});

	it('does not flag a follow-up that already has relevant', () => {
		const ok: Question = {
			id: 'f1',
			name: 'bereich_sonstiges',
			label: 'Falls Sonstiges: bitte angeben',
			type: 'text',
			required: false,
			relevant: "selected(${bereich}, 'sonst')"
		};
		expect(qualityFeedback([ok]).some((m) => m.includes('bereich_sonstiges'))).toBe(false);
	});
});

describe('looksLikeFollowUp', () => {
	it('matches the Sonstiges text-follow-up pattern by name suffix', () => {
		const q: Question = {
			id: 'f',
			name: 'anwendungsbereiche_sonstiges',
			label: 'Falls Sonstiges: bitte angeben',
			type: 'text',
			required: false
		};
		expect(looksLikeFollowUp(q)).toBe(true);
	});

	it('matches by German "Falls Sonstiges" label prefix', () => {
		const q: Question = {
			id: 'f',
			name: 'weirdname',
			label: 'Falls Sonstiges: bitte angeben',
			type: 'text',
			required: false
		};
		expect(looksLikeFollowUp(q)).toBe(true);
	});

	it('matches by English "If other" label prefix', () => {
		const q: Question = {
			id: 'f',
			name: 'weirdname',
			label: 'If other: please specify',
			type: 'text',
			required: false
		};
		expect(looksLikeFollowUp(q)).toBe(true);
	});

	it('does not match a text question without the suffix or prefix', () => {
		const q: Question = {
			id: 'f',
			name: 'comment',
			label: 'Anything else?',
			type: 'text',
			required: false
		};
		expect(looksLikeFollowUp(q)).toBe(false);
	});

	it('does not match a select_one question even with the right name', () => {
		const q: Question = {
			id: 'f',
			name: 'bereich_sonstiges',
			label: 'Sonstiges',
			type: 'select_one',
			required: false,
			choices: []
		};
		expect(looksLikeFollowUp(q)).toBe(false);
	});

	it('does not match when relevant is already set', () => {
		const q: Question = {
			id: 'f',
			name: 'bereich_sonstiges',
			label: 'Falls Sonstiges',
			type: 'text',
			required: false,
			relevant: "selected(${bereich}, 'sonst')"
		};
		expect(looksLikeFollowUp(q)).toBe(false);
	});
});

describe('assembleSurvey', () => {
	it('names the opening and closing notes, and puts demographics before the closing one', () => {
		const note = (name: string) => ({
			id: name,
			name,
			label: name,
			type: 'note' as const,
			required: false
		});
		const q = { id: 'q', name: 'q', label: 'Q?', type: 'text' as const, required: true };
		const age = {
			id: 'age',
			name: 'age',
			label: 'Alter?',
			type: 'integer' as const,
			required: true
		};
		const survey = assembleSurvey(
			{ title: 't', researchQuestions: ['RQ'] },
			[note('intro'), q, note('danke')],
			[age]
		);
		expect(survey.questions.map((x) => x.name)).toEqual(['welcome', 'q', 'age', 'end']);
	});
});
