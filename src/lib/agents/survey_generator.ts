import { AxGen, type AxAIService } from '@ax-llm/ax';
import type { Question, AgentInput } from './types.js';
import { getQwacbackFunctions } from './qwacback.js';
import { extractQuestions } from './question_parser.js';
import generateInstructions from '../../../skills/xlsform/generate-instructions.md?raw';

// Field names are what the model reads, so they say what they mean: in real
// runs "language: informal" still produced "Sie", and "demographics: age"
// made the model write its own age question.
const SIGNATURE =
	'researchQuestion:string, targetGroup?:string, useOfResults?:string, formOfAddress:string "du or Sie: how every question addresses respondents", demographicsAddedSeparately?:string "already in the questionnaire; do not ask about these" -> title:string "short questionnaire title in the language of the questions", reasoning:string, generatedQuestions:json';

/** "du" or "Sie", as the prompt and the model expect it. */
export function formOfAddress(language: AgentInput['language']): string {
	return language === 'informal' ? 'du' : 'Sie';
}

export interface GeneratedSurvey {
	title: string;
	questions: Question[];
	/** Free-text account of why these questions, in the requested UI language. */
	reasoning: string;
	/** Whether the qwac question bank could be searched during generation. */
	qwacAvailable: boolean;
}

export class SurveyGeneratorAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(SIGNATURE, { description: generateInstructions });
	}

	async generateSurvey(
		ai: AxAIService,
		input: AgentInput,
		signal?: AbortSignal
	): Promise<GeneratedSurvey> {
		const qwac = await getQwacbackFunctions();

		const result = await this.gen.forward(
			ai,
			{
				researchQuestion: input.researchQuestion,
				targetGroup: input.targetGroup,
				useOfResults: input.useOfResults,
				formOfAddress: formOfAddress(input.language),
				demographicsAddedSeparately: input.selectedDemographics.join(', ') || undefined
			},
			{ functions: qwac.functions, maxSteps: 8, abortSignal: signal }
		);

		return {
			title: typeof result.title === 'string' ? result.title.trim() : '',
			questions: result.generatedQuestions ? extractQuestions(result.generatedQuestions) : [],
			reasoning: typeof result.reasoning === 'string' ? result.reasoning : '',
			qwacAvailable: qwac.available
		};
	}

	getTraces() {
		return this.gen.getTraces();
	}

	getUsage() {
		return this.gen.getUsage();
	}
}
