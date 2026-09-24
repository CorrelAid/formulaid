import { AxGen, type AxAIService } from '@ax-llm/ax';
import { APPEARANCES, QUESTION_TYPES } from '@correlaid/formtransform';
import { registryLimits } from './sanitize.js';
import type { Question } from './types.js';
import { extractQuestions } from './question_parser.js';

const SIGNATURE =
	'previousQuestions:json, validationFeedback:string, formOfAddress:string "du or Sie; keep it" -> generatedQuestions:json';

/** Built from the registry, so the repair prompt can never drift from what the
 *  validator accepts. */
function buildInstructions(): string {
	const types = [
		...new Set(
			Object.values(QUESTION_TYPES)
				.filter((e) => e.kind === 'question' && e.typeString)
				.map((e) => e.typeString as string)
		)
	];
	const appearances = Object.entries(APPEARANCES)
		.filter(([, a]) => a.supported)
		.map(([name, a]) => `${name} (${(a.validForTypes ?? []).join(', ')})`);
	const { maxName, maxCode } = registryLimits();
	return [
		'You repair an XLSForm questionnaire that a validator rejected.',
		'Return the same questions as JSON, changing only what the validation feedback asks for.',
		'Keep every question, its wording, its rationale and its source unless the feedback says otherwise.',
		'Do not add new questions.',
		`Allowed question types: ${types.join(', ')}.`,
		'select_one and select_multiple need a "choices" array of {name, label}.',
		'select_one_from_file / select_multiple_from_file take a registered vocabulary file (e.g. "select_one_from_file iso_3166_1.csv") and no choices.',
		`Allowed appearances: ${appearances.join('; ')}.`,
		`Names and choice codes: letters and digits only, names up to ${maxName} characters, choice codes up to ${maxCode}.`
	].join('\n');
}

/**
 * Fixes the previous attempt instead of generating a new questionnaire (#16):
 * no qwac tools, no methodology prompt, just the questions and the findings.
 * That keeps good questions from the first attempt and costs a fraction of a
 * full generation.
 */
export class RepairAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(SIGNATURE, { description: buildInstructions() });
	}

	async repair(
		ai: AxAIService,
		input: { previousQuestions: Question[]; validationFeedback: string; formOfAddress: string },
		signal?: AbortSignal
	): Promise<Question[]> {
		const result = await this.gen.forward(
			ai,
			{
				previousQuestions: input.previousQuestions,
				validationFeedback: input.validationFeedback,
				formOfAddress: input.formOfAddress
			},
			{ abortSignal: signal }
		);
		return result.generatedQuestions ? extractQuestions(result.generatedQuestions) : [];
	}

	getTraces() {
		return this.gen.getTraces();
	}

	getUsage() {
		return this.gen.getUsage();
	}
}
