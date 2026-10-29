import { AxGen, type AxAIService } from '@ax-llm/ax';
import { numberResearchQuestions, type Question, type AgentInput } from './types.js';
import { renderBankHits, type BankQuestion } from './qwacback.js';
import { extractQuestions } from './question_parser.js';
import generateInstructions from '../../../skills/xlsform/generate-instructions.md?raw';

// Field names are what the model reads, so they say what they mean: in real
// runs "language: informal" still produced "Sie", and "demographics: age"
// made the model write its own age question.
const SIGNATURE =
	'researchQuestions:string "numbered; cover every one and tag each question with the numbers it serves", targetGroup?:string, useOfResults?:string, furtherNotes?:string "free-form guidance from the user: things to keep short, terms to avoid, topics to focus on", maxQuestions?:number "at most this many answerable questions (notes and demographics do not count); overrides the usual 8–15", formOfAddress:string "du, Sie (German) or you (English): how every question addresses respondents", surveyLanguage:string "de or en: language of every question, label, hint, title and reasoning", demographicsAddedSeparately?:string "already in the questionnaire; do not ask about these", questionBank?:string "qwac bank questions that matched a keyword search, one per line: id | study | concept (other-language tags) | question | answer type" -> title:string "short questionnaire title in the language of the questions", titleShort?:string "optional abbreviated title, only when the title is long", subtitle?:string "optional subtitle: the organisation, wave or year", reasoning:string, generatedQuestions:json';

/** "du" or "Sie" for German, "you" for English (no formal/informal split in
 *  English), as the prompt and the model expect it. */
export function formOfAddress(
	language: AgentInput['language'],
	surveyLanguage: AgentInput['surveyLanguage'] = 'de'
): string {
	if (surveyLanguage === 'en') return 'you';
	return language === 'informal' ? 'du' : 'Sie';
}

/** A trimmed string, or undefined when empty or not a string. */
function optionalText(value: unknown): string | undefined {
	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export interface GeneratedSurvey {
	title: string;
	/** Optional short title and subtitle (#70); undefined when the model gives none. */
	titleShort?: string;
	subtitle?: string;
	questions: Question[];
	/** Free-text account of why these questions, in the requested UI language. */
	reasoning: string;
	/** `generatedQuestions` exactly as the model returned it, before parsing;
	 *  saved as an end-to-end fixture by scripts/test_workflow.ts. */
	raw: unknown;
}

export class SurveyGeneratorAgent {
	private gen: AxGen;

	constructor() {
		this.gen = new AxGen(SIGNATURE, { description: generateInstructions });
	}

	async generateSurvey(
		ai: AxAIService,
		input: AgentInput,
		bankHits: BankQuestion[],
		signal?: AbortSignal
	): Promise<GeneratedSurvey> {
		const result = await this.gen.forward(
			ai,
			{
				researchQuestions: numberResearchQuestions(input.researchQuestions),
				targetGroup: input.targetGroup,
				useOfResults: input.useOfResults,
				furtherNotes: input.furtherNotes,
				maxQuestions: input.maxQuestions,
				formOfAddress: formOfAddress(input.language, input.surveyLanguage),
				surveyLanguage: input.surveyLanguage,
				demographicsAddedSeparately: input.selectedDemographics.join(', ') || undefined,
				questionBank: bankHits.length ? renderBankHits(bankHits) : undefined
			},
			{ abortSignal: signal }
		);

		return {
			title: typeof result.title === 'string' ? result.title.trim() : '',
			titleShort: optionalText(result.titleShort),
			subtitle: optionalText(result.subtitle),
			questions: result.generatedQuestions ? extractQuestions(result.generatedQuestions) : [],
			reasoning: typeof result.reasoning === 'string' ? result.reasoning : '',
			raw: result.generatedQuestions
		};
	}

	getTraces() {
		return this.gen.getTraces();
	}

	getUsage() {
		return this.gen.getUsage();
	}
}
