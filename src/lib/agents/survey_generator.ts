import { AxGen, type AxAIService } from '@ax-llm/ax';
import type { Question, AgentInput } from './types.js';
import { getQwacbackFunctions } from './qwacback.js';
import { extractQuestions } from './question_parser.js';
import generateInstructions from '../../../skills/xlsform/generate-instructions.md?raw';

const SIGNATURE =
	'researchQuestion:string, targetGroup?:string, useOfResults?:string, language:string, demographics?:string -> reasoning:string, generatedQuestions:json';

export class SurveyGeneratorAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(SIGNATURE, { description: generateInstructions });
	}

	async generateSurvey(
		ai: AxAIService<any, any, any>,
		input: AgentInput,
		onStatus?: (msg: string) => void
	): Promise<Question[]> {
		if (onStatus) onStatus('Generiere Umfrage basierend auf der Forschungsfrage...');

		try {
			const qwacFunctions = await getQwacbackFunctions();

			const result = await this.gen.forward(
				ai,
				{
					researchQuestion: input.researchQuestion,
					targetGroup: input.targetGroup,
					useOfResults: input.useOfResults,
					language: input.language,
					demographics: input.selectedDemographics.join(', ') || undefined
				},
				{ functions: qwacFunctions, maxSteps: 8 }
			);

			if (result.generatedQuestions) {
				return extractQuestions(result.generatedQuestions);
			}
		} catch (e) {
			console.error('SurveyGeneratorAgent failed:', e);
		}

		return [];
	}

	getTraces() {
		return this.gen.getTraces();
	}
}
