import type { QUESTION_TYPES } from '@correlaid/formtransform';

type QuestionTypeEntry = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

/** XLSForm `type` cell of every question kind in the formtransform registry.
 *  Composites like `grid` have no single type cell and drop out. */
export type QuestionType = Extract<
	QuestionTypeEntry,
	{ kind: 'question'; typeString: string }
>['typeString'];

export interface Choice {
	label: string;
	name: string;
	/** Written to the `exclusive` column (e.g. "none of the above"). */
	exclusive?: boolean;
}

export interface Question {
	id: string;
	type: QuestionType;
	name: string;
	label: string;
	hint?: string;
	required: boolean;
	choices?: Choice[];
	/** XPath condition for the `relevant` column. */
	relevant?: string;
	/** Why this question is in the questionnaire — surfaced in the UI and in the
	 *  workbook's `explanations` sheet so the result is auditable (#5). */
	rationale?: string;
	/** Where the question came from: a qwac question bank id, an instrument
	 *  name, or 'generated' when the model wrote it itself. */
	source?: string;
}

/** One generator step as reported to the UI's trace list. */
export interface Trace {
	trace: unknown;
	programId?: string;
}

export interface Survey {
	title: string;
	/** XLSForm settings `form_id`; derived from the title so imported forms
	 *  don't collide (#22). */
	formId?: string;
	questions: Question[];
	/** The generator's own account of how it arrived at this set of questions. */
	reasoning?: string;
}

export interface AgentInput {
	researchQuestion: string;
	targetGroup?: string;
	useOfResults?: string;
	language: 'formal' | 'informal';
	selectedDemographics: string[];
	demographicQuestions: Question[];
}

/** What a run is doing right now; the page turns it into status text and
 *  progress (#20). `attempt` is 0 for the first generation and counts repair
 *  attempts after that. */
export type RunPhase =
	| { phase: 'searching' }
	| { phase: 'generating' }
	| { phase: 'validating'; attempt: number }
	| { phase: 'repairing'; attempt: number };
