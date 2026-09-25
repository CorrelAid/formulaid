import { AxGen, type AxAIService } from '@ax-llm/ax';
import type { AgentInput } from './types.js';

const SIGNATURE =
	'researchQuestion:string, targetGroup?:string, useOfResults?:string -> keywords:string[] "5 to 10 single words, each naming one construct to measure"';

const INSTRUCTIONS = [
	'You pick search terms for a survey question bank.',
	'Name the constructs the questionnaire has to measure, e.g. Zufriedenheit, Weiterempfehlung, Motivation, Engagement, Vertrauen.',
	'One word per keyword, no phrases, no names of the organisation or the programme.',
	'The bank is mostly German with some English items: give the German word, and the English one where it differs.',
	'Do not list demographics (age, gender, education, income); they are handled separately.'
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
				researchQuestion: input.researchQuestion,
				targetGroup: input.targetGroup,
				useOfResults: input.useOfResults
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
