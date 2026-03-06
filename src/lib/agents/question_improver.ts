import { AxGen, AxOptimizedProgramImpl, type AxAIService } from '@ax-llm/ax';
import compiled from './compiled/questionimprover.json';

export class QuestionImproverAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(compiled.signature);
		const op = new AxOptimizedProgramImpl(compiled);
		this.gen.applyOptimization(op);
	}

	async improveQuestion(ai: AxAIService<any, any, any>, label: string, type: string, choices: any[], context: string = ''): Promise<{ label: string, choices: any[] }> {
		try {
			const result = await this.gen.forward(ai, {
				questionLabel: label,
				questionType: type,
				choices: choices.length > 0 ? JSON.stringify(choices) : 'No choices provided.',
				context: context.trim() || 'No additional context provided.'
			});

			return {
				label: result.improvedLabel || label,
				choices: result.improvedChoices || choices
			};
		} catch (e) {
			console.error('QuestionImproverAgent failed:', e);
			return { label, choices };
		}
	}

	getTraces() {
		return this.gen.getTraces();
	}
}
