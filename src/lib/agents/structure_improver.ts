import { AxGen, AxOptimizedProgramImpl, type AxAIService } from '@ax-llm/ax';
import type { Question } from './types.js';
import compiled from './compiled/structureimprover.json';

export class StructureImproverAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(compiled.signature);
		const op = new AxOptimizedProgramImpl(compiled);
		this.gen.applyOptimization(op);
	}

	async organizeSurvey(ai: AxAIService<any, any, any>, researchQuestion: string, questions: Question[], onStatus?: (msg: string) => void): Promise<Question[]> {
		if (onStatus) onStatus('Optimiere Umfragestruktur und Ablauf...');

		try {
			const result = await this.gen.forward(ai, {
				researchQuestion,
				questions: JSON.stringify(questions)
			});

			if (result.organizedQuestions) {
				if (Array.isArray(result.organizedQuestions)) {
					return result.organizedQuestions as Question[];
				} else if (typeof result.organizedQuestions === 'object' && (result.organizedQuestions as any).questions) {
					return (result.organizedQuestions as any).questions as Question[];
				}
			}
		} catch (e) {
			console.error('StructureImproverAgent failed:', e);
		}

		return questions;
	}

	getTraces() {
		return this.gen.getTraces();
	}
}
