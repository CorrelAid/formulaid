import type { AxAIService } from '@ax-llm/ax';
import { SurveyGeneratorAgent } from './survey_generator.js';
import { StructureImproverAgent } from './structure_improver.js';
import type { AgentInput, Survey } from './types.js';

export class LeadAgent {
	private surveyGenerator: SurveyGeneratorAgent;
	private structureImprover: StructureImproverAgent;
	private ai: AxAIService<any, any, any>;

	constructor(ai: AxAIService<any, any, any>) {
		this.ai = ai;
		this.surveyGenerator = new SurveyGeneratorAgent();
		this.structureImprover = new StructureImproverAgent();
	}

	async buildSurvey(input: AgentInput, onStatus?: (msg: string) => void, onTrace?: (trace: any) => void): Promise<Survey> {
		const captureTrace = (agent: any) => {
			if (!onTrace) return;
			const traces = agent.getTraces();
			if (traces.length > 0) {
				const lastTrace = traces[traces.length - 1];
				onTrace({
					trace: lastTrace.trace,
					programId: lastTrace.programId
				});
			}
		};

		// 1. Generate Questions using RAG context
		if (onStatus) onStatus('Generiere Fragen aus Kontext...');
		const generatedQuestions = await this.surveyGenerator.generateSurvey(this.ai, input, onStatus);
		captureTrace(this.surveyGenerator);

		// 2. Combine with Demographic Questions (included as is)
		const combinedQuestions = [...input.demographicQuestions, ...generatedQuestions];

		// 3. Improve Survey Structure
		if (onStatus) onStatus('Verfeinere Umfragestruktur...');
		const organizedQuestions = await this.structureImprover.organizeSurvey(
			this.ai,
			input.researchQuestion,
			combinedQuestions,
			onStatus
		);
		captureTrace(this.structureImprover);

		if (onStatus) onStatus('Umfrage erfolgreich erstellt!');

		return {
			title: 'Generated Questionnaire',
			questions: organizedQuestions
		};
	}
}
