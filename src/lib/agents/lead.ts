import type { AxAIService } from '@ax-llm/ax';
import { SurveyGeneratorAgent, formOfAddress } from './survey_generator.js';
import { RepairAgent } from './repair_agent.js';
import { KeywordAgent } from './keyword_agent.js';
import { searchQuestionBank } from './qwacback.js';
import { sanitizeSurvey } from './sanitize.js';
import { XLSFormGenerator, formIdFor } from './xlsform_generator.js';
import { XLSFormValidator, type ValidationFinding } from './xlsform_validator.js';
import type { AgentInput, Question, RunPhase, Survey, Trace } from './types.js';

/** How often the repair agent may fix the questionnaire before it is
 *  delivered with the remaining findings shown (#11). */
export const MAX_REPAIR_ATTEMPTS = 2;

/** The prompt asks for 8–15 answerable questions; small models often stop
 *  short, or write everything as open text. */
const MIN_QUESTIONS = 8;
const MAX_OPEN_QUESTIONS = 3;

/** Problems the validator doesn't see but a repair can fix. They trigger a
 *  repair like validator errors do, but aren't reported as findings: the form
 *  is valid, just weaker. */
export function qualityFeedback(questions: Question[]): string[] {
	const answerable = questions.filter((q) => q.type !== 'note');
	const open = answerable.filter((q) => q.type === 'text');
	const feedback: string[] = [];
	if (answerable.length < MIN_QUESTIONS) {
		feedback.push(
			`Only ${answerable.length} answerable questions (notes don't count). Add ${MIN_QUESTIONS - answerable.length} more that serve the research goal, preferably closed questions with choices.`
		);
	}
	if (open.length > MAX_OPEN_QUESTIONS) {
		feedback.push(
			`${open.length} open text questions: keep at most ${MAX_OPEN_QUESTIONS} for answers that really can't be predefined, and turn the rest into select_one questions with a fitting answer scale (e.g. a 5-point scale). Open: ${open.map((q) => q.name).join(', ')}.`
		);
	}
	return feedback;
}

/** How far a questionnaire is from the quality targets: missing questions
 *  plus surplus open ones. 0 means nothing to fix. */
export function qualityGap(questions: Question[]): number {
	const answerable = questions.filter((q) => q.type !== 'note');
	const open = answerable.filter((q) => q.type === 'text').length;
	return Math.max(0, MIN_QUESTIONS - answerable.length) + Math.max(0, open - MAX_OPEN_QUESTIONS);
}

interface Evaluated {
	questions: Question[];
	survey: Survey;
	workbook: Uint8Array;
	findings: ValidationFinding[];
	errors: ValidationFinding[];
	gap: number;
}

/** A repair only replaces what we have if it is strictly better: fewer
 *  validator errors, or as many errors and a smaller quality gap. In real runs
 *  small models sometimes "repair" by dropping questions. */
function isBetter(candidate: Evaluated, current: Evaluated): boolean {
	if (candidate.errors.length !== current.errors.length) {
		return candidate.errors.length < current.errors.length;
	}
	return candidate.gap < current.gap;
}

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
 * Runs one questionnaire generation end to end: search the question bank →
 * generate → sanitize → build the workbook → validate → repair, capped at MAX_REPAIR_ATTEMPTS. Whatever
 * the last attempt produced is returned together with the remaining findings,
 * so the caller never ships an invalid form silently.
 */
export class LeadAgent {
	private keywordAgent = new KeywordAgent();
	private surveyGenerator = new SurveyGeneratorAgent();
	private repairAgent = new RepairAgent();
	private workbookGenerator = new XLSFormGenerator();
	private validator = new XLSFormValidator();

	constructor(private ai: AxAIService) {}

	async run(input: AgentInput, { signal, onPhase, onTrace }: RunOptions = {}): Promise<RunResult> {
		// Search the bank as a fixed step, not a tool the model may skip (#33).
		onPhase?.({ phase: 'searching' });
		const keywords = await this.keywordAgent.keywords(this.ai, input, signal);
		this.reportTrace(this.keywordAgent, onTrace);
		const bank = await searchQuestionBank(keywords, signal);

		onPhase?.({ phase: 'generating' });
		const generated = await this.surveyGenerator.generateSurvey(this.ai, input, bank.hits, signal);
		this.reportTrace(this.surveyGenerator, onTrace);

		const base = {
			title: generated.title,
			formId: formIdFor(generated.title),
			reasoning: generated.reasoning
		};
		const evaluate = (questions: Question[]): Evaluated => {
			// Demographics go last: the UI promises it, and it is survey convention.
			const survey = sanitizeSurvey({
				...base,
				questions: [...questions, ...input.demographicQuestions]
			});
			const workbook = this.workbookGenerator.generate(survey);
			const findings = this.validate(workbook);
			const errors = findings.filter((f) => f.severity === 'error');
			return { questions, survey, workbook, findings, errors, gap: qualityGap(questions) };
		};

		onPhase?.({ phase: 'validating', attempt: 0 });
		let current = evaluate(generated.questions);
		let attempt = 0;
		while ((current.errors.length > 0 || current.gap > 0) && attempt < MAX_REPAIR_ATTEMPTS) {
			attempt++;
			onPhase?.({ phase: 'repairing', attempt });
			// Repair the sanitized questions, so names in the findings match what
			// the model sees; demographics stay out of it and are appended again.
			const repaired = await this.repairAgent.repair(
				this.ai,
				{
					previousQuestions: current.survey.questions.slice(0, current.questions.length),
					researchGoal: input.researchQuestion,
					validationFeedback: [
						...current.errors.map((e) => e.message),
						...qualityFeedback(current.questions)
					]
						.map((m) => `- ${m}`)
						.join('\n'),
					formOfAddress: formOfAddress(input.language)
				},
				signal
			);
			this.reportTrace(this.repairAgent, onTrace);
			onPhase?.({ phase: 'validating', attempt });
			const candidate = evaluate(repaired);
			if (repaired.length > 0 && isBetter(candidate, current)) current = candidate;
		}

		return {
			survey: current.survey,
			workbook: current.workbook,
			findings: current.findings,
			repairAttempts: attempt,
			qwacAvailable: bank.available
		};
	}

	/** Tokens used by all runs of this agent so far, summed over every step
	 *  (used by scripts/test_workflow.ts to compare prompts). */
	usage(): { promptTokens: number; completionTokens: number } {
		let promptTokens = 0;
		let completionTokens = 0;
		for (const u of [
			...this.keywordAgent.getUsage(),
			...this.surveyGenerator.getUsage(),
			...this.repairAgent.getUsage()
		]) {
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
