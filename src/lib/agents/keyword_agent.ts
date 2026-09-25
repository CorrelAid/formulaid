import { AxGen, type AxAIService } from '@ax-llm/ax';
import { numberResearchQuestions, type AgentInput } from './types.js';

const SIGNATURE =
	'researchQuestions:string "numbered", targetGroup?:string, useOfResults?:string, furtherNotes?:string -> keywords:string[] "6 to 14 single words: each construct to measure, in German and in English"';

const INSTRUCTIONS = [
	'You pick search terms for a survey question bank.',
	'Name the constructs the questionnaire has to measure, e.g. Zufriedenheit, Weiterempfehlung, Motivation, Engagement, Vertrauen.',
	'One word per keyword, no phrases, no names of the organisation or the programme.',
	'The bank has German and English items: give every construct in both languages, e.g. Selbstwirksamkeit and efficacy, Vertrauen and trust.',
	'When the goal is to evaluate an offer, programme or event, include Zufriedenheit and Weiterempfehlung.',
	'Do not list demographics (age, gender, education, income); they are handled separately.',
	'If furtherNotes mentions specific topics, terms or constructs to cover (or to avoid), include them or skip them accordingly.'
].join('\n');

/**
 * Proposes the keywords the question bank is searched with (#33). A short,
 * cheap call: the search itself runs in code, so it can't be skipped.
 */
export class KeywordAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(SIGNATURE, { description: INSTRUCTIONS });
	}

	async keywords(ai: AxAIService, input: AgentInput, signal?: AbortSignal): Promise<string[]> {
		const result = await this.gen.forward(
			ai,
			{
				researchQuestions: numberResearchQuestions(input.researchQuestions),
				targetGroup: input.targetGroup,
				useOfResults: input.useOfResults,
				furtherNotes: input.furtherNotes
			},
			{ abortSignal: signal }
		);
		const raw: unknown[] = Array.isArray(result.keywords) ? result.keywords : [];
		// Models still send phrases now and then; every word gets searched.
		return [
			...new Set(
				raw
					.filter((k): k is string => typeof k === 'string')
					.flatMap((k) => k.split(/[\s,;/]+/))
					.map((k) => k.trim())
					.filter((k) => k.length >= 3)
			)
		];
	}

	getTraces() {
		return this.gen.getTraces();
	}

	getUsage() {
		return this.gen.getUsage();
	}
}
