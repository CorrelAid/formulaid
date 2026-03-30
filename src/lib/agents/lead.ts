import type { AxAIService } from '@ax-llm/ax';
import { SurveyGeneratorAgent } from './survey_generator.js';
import type { AgentInput, Survey } from './types.js';

export class LeadAgent {
	private surveyGenerator: SurveyGeneratorAgent;
	private ai: AxAIService<any, any, any>;

	constructor(ai: AxAIService<any, any, any>) {
		this.ai = ai;
		this.surveyGenerator = new SurveyGeneratorAgent();
	}

	async buildSurvey(
		input: AgentInput,
		onStatus?: (msg: string) => void,
		onTrace?: (trace: any) => void
	): Promise<Survey> {
		if (onStatus) onStatus('Generiere Fragen aus Kontext...');

		const generatedQuestions = await this.surveyGenerator.generateSurvey(
			this.ai,
			input,
			onStatus
		);

		if (onTrace) {
			const traces = this.surveyGenerator.getTraces();
			if (traces.length > 0) {
				const last = traces[traces.length - 1];
				onTrace({ trace: last.trace, programId: last.programId });
			}
		}

		if (onStatus) onStatus('Umfrage erfolgreich erstellt!');

		return {
			title: 'Generated Questionnaire',
			questions: [...input.demographicQuestions, ...generatedQuestions]
		};
	}
}
