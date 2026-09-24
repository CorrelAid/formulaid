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
}

export interface Question {
	id: string;
	type: QuestionType;
	name: string;
	label: string;
	hint?: string;
	required: boolean;
	choices?: Choice[];
	logic?: string; // For relevant column in XLSForm
	/** Why this question is in the questionnaire — surfaced in the UI and in the
	 *  workbook's `explanations` sheet so the result is auditable (#5). */
	rationale?: string;
	/** Where the question came from: a qwac question bank id, an instrument
	 *  name, or 'generated' when the model wrote it itself. */
	source?: string;
}

export interface Survey {
	title: string;
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
	contextQuestions: Question[];
	/** Findings from a previous validation run, fed back so the generator can
	 *  repair its own output instead of the app guessing at a fix (#11). */
	validationFeedback?: string;
}
