import type { AxAIService } from '@ax-llm/ax';
import { SurveyGeneratorAgent, formOfAddress } from './survey_generator.js';
import { RepairAgent } from './repair_agent.js';
import { KeywordAgent } from './keyword_agent.js';
import { searchQuestionBank, type BankQuestion } from './qwacback.js';
import { sanitizeSurvey } from './sanitize.js';
import {
	linkFollowUps,
	openQuestions,
	orphanedFollowUps,
	unconditionedQuestions
} from './follow_ups.js';
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
export function qualityFeedback(questions: Question[], researchQuestionCount = 0): string[] {
	const answerable = questions.filter((q) => q.type !== 'note');
	const open = openQuestions(answerable);
	const feedback: string[] = [];
	for (const n of uncovered(questions, researchQuestionCount)) {
		feedback.push(
			`Research question ${n} is not covered by any question. Add at least one that serves it and list ${n} in its researchQuestions.`
		);
	}
	if (answerable.length < MIN_QUESTIONS) {
		feedback.push(
			`Only ${answerable.length} answerable questions (notes don't count). Add ${MIN_QUESTIONS - answerable.length} more that serve the research goal, preferably closed questions with choices.`
		);
	}
	if (open.length > MAX_OPEN_QUESTIONS) {
		feedback.push(
			`${open.length} open text questions: keep at most ${MAX_OPEN_QUESTIONS} for answers that really can't be predefined, and turn the rest into select_one questions with a fitting answer scale (e.g. a 5-point scale). Follow-ups with a relevant don't count. Open: ${open.map((q) => q.name).join(', ')}.`
		);
	}
	// Follow-ups the code couldn't link (linkFollowUps): no select before them
	// offers the answer, or several answers could open them. Valid XLSForm, but
	// shown to every respondent (#51).
	const orphaned = orphanedFollowUps(answerable);
	if (orphaned.length > 0) {
		feedback.push(
			`Follow-up question(s) without a parent answer: ${orphaned.map((q) => q.name).join(', ')}. Put each directly after the select it depends on, give that select the answer that opens it (code \`other\`, label "Sonstiges", or a yes answer), and set \`relevant\`: \`selected(\${parent}, 'other')\` for select_multiple, \`\${parent} = 'other'\` for select_one. If it doesn't depend on an answer, remove it.`
		);
	}
	// Wording that applies to some respondents only, with nothing that hides
	// it from the others (#46).
	const unconditioned = unconditionedQuestions(answerable);
	if (unconditioned.length > 0) {
		feedback.push(
			`Question(s) worded for some respondents only ("falls/wenn Sie …") but shown to everyone: ${unconditioned.map((q) => q.name).join(', ')}. Add a \`relevant\` that refers to the earlier question deciding it (add that filter question if there is none), or reword it so it applies to everyone.`
		);
	}
	return feedback;
}

/** How far a questionnaire is from the quality targets: missing questions,
 *  surplus open ones, uncovered research questions, and questions that
 *  should be conditional but aren't. 0 means nothing to fix. */
export function qualityGap(questions: Question[], researchQuestionCount = 0): number {
	const answerable = questions.filter((q) => q.type !== 'note');
	return (
		Math.max(0, MIN_QUESTIONS - answerable.length) +
		Math.max(0, openQuestions(answerable).length - MAX_OPEN_QUESTIONS) +
		uncovered(questions, researchQuestionCount).length +
		orphanedFollowUps(answerable).length +
		unconditionedQuestions(answerable).length
	);
}

/** Research question numbers (1-based) that no answerable question serves (#34). */
function uncovered(questions: Question[], count: number): number[] {
	const served = new Set(
		questions.filter((q) => q.type !== 'note').flatMap((q) => q.researchQuestions ?? [])
	);
	return Array.from({ length: count }, (_, i) => i + 1).filter((n) => !served.has(n));
}

/** Drop generated questions whose `name` collides with a demographic; the
 *  qwac copy is the canonical one and will be appended by `assembleSurvey`.
 *  Same-label duplicates would survive sanitization as `age` + `age2`, both
 *  with the same German label, which is what users reported (#47). */
export function dedupAgainstDemographics(
	generated: Question[],
	demographics: Question[]
): Question[] {
	if (demographics.length === 0) return generated;
	const names = new Set(demographics.map((d) => d.name));
	return generated.filter((q) => !names.has(q.name));
}

/** With a single research question every question serves it, whether or not
 *  the model said so; numbers beyond the list are dropped. */
function withResearchQuestions(questions: Question[], count: number): Question[] {
	return questions.map((q) => {
		const valid = (q.researchQuestions ?? []).filter((n) => n <= count);
		const researchQuestions = valid.length === 0 && count === 1 && q.type !== 'note' ? [1] : valid;
		const rest = { ...q };
		delete rest.researchQuestions;
		return researchQuestions.length ? { ...rest, researchQuestions } : rest;
	});
}

/**
 * The survey as delivered, from the generated questions: research questions
 * mapped, demographics appended, names and codes sanitized. Exported so the
 * end-to-end tests run exactly this, without a model.
 *
 * Follow-ups whose parent answer is clear get their `relevant` here, like
 * any other mechanical fix (follow_ups.ts).
 *
 * An opening note is named `welcome` and a closing note `end`: formtransform
 * turns those into LimeSurvey's welcome and end texts instead of questions.
 * Demographics go last (the UI promises it, and it is survey convention), but
 * before the closing note, so the thank-you really comes at the end.
 */
export function assembleSurvey(
	base: Omit<Survey, 'questions'> & { researchQuestions: string[] },
	generated: Question[],
	demographics: Question[]
): Survey {
	const questions = linkFollowUps(withResearchQuestions(generated, base.researchQuestions.length));
	const first = questions[0];
	const last = questions.length > 1 ? questions[questions.length - 1] : undefined;
	const body = questions.slice(
		first?.type === 'note' ? 1 : 0,
		last?.type === 'note' ? -1 : undefined
	);
	return sanitizeSurvey({
		...base,
		questions: [
			...(first?.type === 'note' ? [{ ...first, name: 'welcome' }] : []),
			...body,
			...demographics,
			...(last?.type === 'note' ? [{ ...last, name: 'end' }] : [])
		]
	});
}

interface Evaluated {
	/** The generated part of `survey`: sanitized, without demographics. */
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
	/** The first generation as the model returned it (see GeneratedSurvey.raw). */
	generatedRaw: unknown;
	/** What the bank was searched for, and what the generator was offered. */
	bankSearch: { keywords: string[]; hits: BankQuestion[] };
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

	async run(raw: AgentInput, { signal, onPhase, onTrace }: RunOptions = {}): Promise<RunResult> {
		const researchQuestions = raw.researchQuestions.map((q) => q.trim()).filter(Boolean);
		if (researchQuestions.length === 0) throw new Error('No research question given');
		const input = { ...raw, researchQuestions };
		const rqCount = researchQuestions.length;

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
			researchQuestions,
			reasoning: generated.reasoning
		};
		const demographicIds = new Set(input.demographicQuestions.map((q) => q.id));
		const evaluate = (parsed: Question[]): Evaluated => {
			// The model is told `demographicsAddedSeparately`, but it sometimes
			// still writes a birth-date / age / sex question and names it the
			// same as a demographic. assembleSurvey appends the qwac demographic
			// alongside, sanitizeSurvey then renames the duplicate, and the
			// user ends up with two questions sharing one label (#47). Drop
			// the generated duplicate here so the demographic stays the only
			// copy.
			const survey = assembleSurvey(
				base,
				dedupAgainstDemographics(parsed, input.demographicQuestions),
				input.demographicQuestions
			);
			// The questions as delivered (sanitized, follow-ups linked) minus the
			// demographics, found by qwac id rather than by position: they sit
			// before a closing note (#56). Quality checks and the repair both work
			// on these, so the names in the feedback are the names the model sees
			// (#53).
			const questions = survey.questions.filter((q) => !demographicIds.has(q.id));
			const workbook = this.workbookGenerator.generate(survey);
			const findings = this.validate(workbook);
			const errors = findings.filter((f) => f.severity === 'error');
			return {
				questions,
				survey,
				workbook,
				findings,
				errors,
				gap: qualityGap(questions, rqCount)
			};
		};

		onPhase?.({ phase: 'validating', attempt: 0 });
		let current = evaluate(generated.questions);
		let attempt = 0;
		while ((current.errors.length > 0 || current.gap > 0) && attempt < MAX_REPAIR_ATTEMPTS) {
			attempt++;
			onPhase?.({ phase: 'repairing', attempt });
			// Demographics stay out of the repair and are appended again.
			const repaired = await this.repairAgent.repair(
				this.ai,
				{
					previousQuestions: current.questions,
					researchQuestions,
					validationFeedback: [
						...current.errors.map((e) => e.message),
						...qualityFeedback(current.questions, rqCount)
					]
						.map((m) => `- ${m}`)
						.join('\n'),
					formOfAddress: formOfAddress(input.language, input.surveyLanguage)
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
			qwacAvailable: bank.available,
			bankSearch: { keywords, hits: bank.hits },
			generatedRaw: generated.raw
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
