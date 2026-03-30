export type QuestionType = 'select_one' | 'select_multiple' | 'text' | 'integer' | 'decimal' | 'date' | 'note';

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
}

export interface Survey {
	title: string;
	questions: Question[];
}

export interface AgentInput {
	researchQuestion: string;
	targetGroup?: string;
	useOfResults?: string;
	language: 'formal' | 'informal';
	selectedDemographics: string[];
	demographicQuestions: Question[];
	contextQuestions: Question[];
}
