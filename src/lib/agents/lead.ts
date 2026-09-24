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
		/** Receives i18n keys (wizard.status*), translated by the page. */
		onStatus?: (msg: string) => void,
		onTrace?: (trace: any) => void
	): Promise<Survey> {
		if (onStatus) onStatus('wizard.statusGeneratingQuestions');

		const generated = await this.surveyGenerator.generateSurvey(this.ai, input, onStatus);

		if (onTrace) {
			const traces = this.surveyGenerator.getTraces();
			if (traces.length > 0) {
				const last = traces[traces.length - 1];
				onTrace({ trace: last.trace, programId: last.programId });
			}
		}

		if (onStatus) onStatus('wizard.statusCreated');

		return {
			title: 'Generated Questionnaire',
			// Demographics go last: the UI promises it, and it is survey convention.
			questions: [...generated.questions, ...input.demographicQuestions],
			reasoning: generated.reasoning
		};
	}
}
