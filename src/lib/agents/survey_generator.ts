import { AxGen, type AxAIService } from '@ax-llm/ax';
import type { Question, AgentInput } from './types.js';
import { getQwacbackFunctions } from './qwacback.js';
import { extractQuestions } from './question_parser.js';
import generateInstructions from '../../../skills/xlsform/generate-instructions.md?raw';

const SIGNATURE =
	'researchQuestion:string, targetGroup?:string, useOfResults?:string, language:string, demographics?:string, validationFeedback?:string -> reasoning:string, generatedQuestions:json';

export interface GeneratedSurvey {
	questions: Question[];
	/** Free-text account of why these questions, in the requested UI language. */
	reasoning: string;
}

export class SurveyGeneratorAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(SIGNATURE, { description: generateInstructions });
	}

	async generateSurvey(
		ai: AxAIService<any, any, any>,
		input: AgentInput,
		onStatus?: (msg: string) => void
	): Promise<GeneratedSurvey> {
		if (onStatus) onStatus('wizard.statusGeneratingSurvey');

		const qwacFunctions = await getQwacbackFunctions();

		const result = await this.gen.forward(
			ai,
			{
				researchQuestion: input.researchQuestion,
				targetGroup: input.targetGroup,
				useOfResults: input.useOfResults,
				language: input.language,
				demographics: input.selectedDemographics.join(', ') || undefined,
				validationFeedback: input.validationFeedback
			},
			{ functions: qwacFunctions, maxSteps: 8 }
		);

		return {
			questions: result.generatedQuestions ? extractQuestions(result.generatedQuestions) : [],
			reasoning: typeof result.reasoning === 'string' ? result.reasoning : ''
		};
	}

	getTraces() {
		return this.gen.getTraces();
	}
}
