import { AxGen, type AxAIService } from '@ax-llm/ax';
import type { Question, AgentInput } from './types.js';
import { getQwacbackFunctions } from './qwacback.js';
import { extractQuestions } from './question_parser.js';
import generateInstructions from '../../../skills/xlsform/generate-instructions.md?raw';

const SIGNATURE =
	'researchQuestion:string, targetGroup?:string, useOfResults?:string, language:string, demographics?:string -> title:string "short questionnaire title in the language of the questions", reasoning:string, generatedQuestions:json';

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
				language: input.language,
				demographics: input.selectedDemographics.join(', ') || undefined
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
}
