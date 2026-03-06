import { AxGen, AxOptimizedProgramImpl, type AxAIService } from '@ax-llm/ax';
import type { Question, AgentInput } from './types.js';
import compiled from './compiled/surveygenerator.json';

export class SurveyGeneratorAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(compiled.signature);
		const op = new AxOptimizedProgramImpl(compiled);
		this.gen.applyOptimization(op);
	}

	async generateSurvey(ai: AxAIService<any, any, any>, input: AgentInput, onStatus?: (msg: string) => void): Promise<Question[]> {
		if (onStatus) onStatus(`Generiere Umfrage basierend auf der Forschungsfrage...`);

		try {
			const result = await this.gen.forward(ai, {
				researchQuestion: input.researchQuestion,
				language: input.language,
				demographics: input.selectedDemographics.join(', ') || 'None selected',
				contextQuestions: input.contextQuestions.length > 0 ? JSON.stringify(input.contextQuestions) : 'No context questions provided'
			});

			if (result.generatedQuestions) {
				// Handle both array and object wrap
				if (Array.isArray(result.generatedQuestions)) {
					return result.generatedQuestions as Question[];
				} else if (typeof result.generatedQuestions === 'object' && (result.generatedQuestions as any).questions) {
					return (result.generatedQuestions as any).questions as Question[];
				}
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
