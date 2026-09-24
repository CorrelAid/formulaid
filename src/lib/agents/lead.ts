import type { AxAIService } from '@ax-llm/ax';
import { SurveyGeneratorAgent, formOfAddress } from './survey_generator.js';
import { RepairAgent } from './repair_agent.js';
import { sanitizeSurvey } from './sanitize.js';
import { XLSFormGenerator, formIdFor } from './xlsform_generator.js';
import { XLSFormValidator, type ValidationFinding } from './xlsform_validator.js';
import type { AgentInput, Question, RunPhase, Survey, Trace } from './types.js';

/** How often the repair agent may fix the questionnaire before it is
 *  delivered with the remaining findings shown (#11). */
export const MAX_REPAIR_ATTEMPTS = 2;

export interface RunOptions {
	signal?: AbortSignal;
	onPhase?: (phase: RunPhase) => void;
	onTrace?: (trace: Trace) => void;
}

export interface RunResult {
	survey: Survey;
	workbook: Uint8Array;
	/** What the validator still reports after the last attempt. */
	findings: ValidationFinding[];
	repairAttempts: number;
	/** False when qwac was unreachable and every question is model-written. */
	qwacAvailable: boolean;
}

/**
 * Runs one questionnaire generation end to end: generate → sanitize → build
 * the workbook → validate → repair, capped at MAX_REPAIR_ATTEMPTS. Whatever
 * the last attempt produced is returned together with the remaining findings,
 * so the caller never ships an invalid form silently.
 */
export class LeadAgent {
	private surveyGenerator = new SurveyGeneratorAgent();
	private repairAgent = new RepairAgent();
	private workbookGenerator = new XLSFormGenerator();
	private validator = new XLSFormValidator();

	constructor(private ai: AxAIService) {}

	async run(input: AgentInput, { signal, onPhase, onTrace }: RunOptions = {}): Promise<RunResult> {
		onPhase?.({ phase: 'generating' });
		const generated = await this.surveyGenerator.generateSurvey(this.ai, input, signal);
		this.reportTrace(this.surveyGenerator, onTrace);

		const base = {
			title: generated.title,
			formId: formIdFor(generated.title),
			reasoning: generated.reasoning
		};
		let questions: Question[] = generated.questions;

		for (let attempt = 0; ; attempt++) {
			onPhase?.({ phase: 'validating', attempt });
			// Demographics go last: the UI promises it, and it is survey convention.
			const survey = sanitizeSurvey({
				...base,
				questions: [...questions, ...input.demographicQuestions]
			});
			const workbook = this.workbookGenerator.generate(survey);
			const findings = this.validate(workbook);
			const errors = findings.filter((f) => f.severity === 'error');

			if (errors.length === 0 || attempt === MAX_REPAIR_ATTEMPTS) {
				return {
					survey,
					workbook,
					findings,
					repairAttempts: attempt,
					qwacAvailable: generated.qwacAvailable
				};
			}

			onPhase?.({ phase: 'repairing', attempt: attempt + 1 });
			// Repair the sanitized questions, so names in the findings match what
			// the model sees; demographics stay out of it and are appended again.
			const repaired = await this.repairAgent.repair(
				this.ai,
				{
					previousQuestions: survey.questions.slice(0, questions.length),
					validationFeedback: errors.map((e) => `- ${e.message}`).join('\n'),
					formOfAddress: formOfAddress(input.language)
				},
				signal
			);
			this.reportTrace(this.repairAgent, onTrace);
			// An empty answer would throw away the questionnaire; keep the old one.
			if (repaired.length > 0) questions = repaired;
		}
	}

	/** Tokens used by all runs of this agent so far, summed over both
	 *  generators (used by scripts/test_workflow.ts to compare prompts). */
	usage(): { promptTokens: number; completionTokens: number } {
		let promptTokens = 0;
		let completionTokens = 0;
		for (const u of [...this.surveyGenerator.getUsage(), ...this.repairAgent.getUsage()]) {
			promptTokens += u.tokens?.promptTokens ?? 0;
			completionTokens += u.tokens?.completionTokens ?? 0;
		}
		return { promptTokens, completionTokens };
	}

	private validate(workbook: Uint8Array): ValidationFinding[] {
		try {
			return this.validator.validate(workbook);
		} catch (e) {
			return [{ severity: 'error', message: `Validation failed to run: ${(e as Error).message}` }];
		}
	}

	private reportTrace(
		agent: { getTraces(): { trace: unknown; programId: string }[] },
		onTrace?: (trace: Trace) => void
	) {
		const last = agent.getTraces().at(-1);
		if (onTrace && last) onTrace({ trace: last.trace, programId: last.programId });
	}
}
