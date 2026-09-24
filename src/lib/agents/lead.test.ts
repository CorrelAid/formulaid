import { describe, it, expect, vi } from 'vitest';
import { AxMockAIService, type AxChatRequest } from '@ax-llm/ax';
import { LeadAgent, MAX_REPAIR_ATTEMPTS } from './lead.js';
import { XLSFormValidator, type ValidationFinding } from './xlsform_validator.js';
import type { AgentInput, Question } from './types.js';

vi.mock('./qwacback.js', () => ({
	getQwacbackFunctions: async () => ({ functions: [], available: false })
}));

const input: AgentInput = {
	researchQuestion: 'Wie zufrieden sind Ehrenamtliche?',
	language: 'formal',
	selectedDemographics: [],
	demographicQuestions: [
		{ id: 'd1', name: 'age', label: 'Alter?', type: 'integer', required: true }
	]
};

const good: Partial<Question>[] = [
	{ name: 'satisfaction', label: 'Wie zufrieden sind Sie?', type: 'integer', rationale: 'Kern' }
];
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

/** Answers as the generator or the repair agent, depending on the prompt. */
function mockAI(generated: Partial<Question>[], repaired: Partial<Question>[]) {
	const calls = { generate: 0, repair: 0 };
	const ai = new AxMockAIService<string>({
		features: { functions: true, streaming: false },
		chatResponse: async (req: Readonly<AxChatRequest<unknown>>) => {
			const first = req.chatPrompt[0];
			const system = first && 'content' in first ? String(first.content) : '';
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
		expect(result.survey.questions.map((q) => q.name)).toEqual(['satisfaction', 'age']);
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

	it('stops after MAX_REPAIR_ATTEMPTS and returns the remaining findings', async () => {
		const spy = rejectFirst(Infinity);
		const { ai, calls } = mockAI(good, good);
		const result = await new LeadAgent(ai).run(input);
		spy.mockRestore();

		expect(calls.repair).toBe(MAX_REPAIR_ATTEMPTS);
		expect(result.repairAttempts).toBe(MAX_REPAIR_ATTEMPTS);
		expect(result.findings).toEqual([rejected]);
	});

	it('rejects when the run is cancelled', async () => {
		const { ai } = mockAI(good, []);
		const controller = new AbortController();
		controller.abort();
		await expect(new LeadAgent(ai).run(input, { signal: controller.signal })).rejects.toThrow();
	});
});
