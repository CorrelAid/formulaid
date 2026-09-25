import { QUESTION_TYPES } from '@correlaid/formtransform';
import type { Choice, Question, QuestionType } from './types.js';

/** Set of XLSForm type strings the parser will preserve verbatim from the type
 *  cell instead of falling back to label-based inference. The runtime
 *  counterpart of `QuestionType` in `./types.ts`, built from the same filter. */
const KNOWN_QUESTION_TYPES = new Set(
	Object.values(QUESTION_TYPES)
		.filter((e) => e.kind === 'question' && e.typeString)
		.map((e) => e.typeString as string)
);

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[äöü]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue' })[c] ?? c)
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_|_$/g, '')
		.slice(0, 40);
}

const MULTI_CHOICE = /\b(welche.*alle|mehrere|alle.*die|auswählen|select all|all that apply)\b/;

/** Type for a question whose type cell is missing or not in the registry.
 *  With choices it is always a select; scale wording ("wie zufrieden") means
 *  a select_one scale, never integer, which would drop the choices and work
 *  against the quality check in lead.ts (#27). */
function inferType(text: string, hasChoices = false): QuestionType {
	const t = text.toLowerCase();
	if (MULTI_CHOICE.test(t)) return 'select_multiple';
	if (hasChoices) return 'select_one';
	if (/\b(skala|bewert|zufrieden|wie (sehr|gut|häufig|oft))/.test(t)) return 'select_one';
	if (/\b(welche[rs]?|wählen|trifft.*zu|falls ja)\b/.test(t)) return 'select_one';
	return 'text';
}

/** The model writes choices as plain strings, {name, label}, {value, label} or
 *  {code, label}; accept all of them (#26). */
function normalizeChoices(raw: unknown[]): Choice[] {
	return raw.flatMap((c, i): Choice[] => {
		if (typeof c === 'string' || typeof c === 'number') {
			return [{ name: String(i + 1), label: String(c) }];
		}
		if (typeof c !== 'object' || c === null) return [];
		const o = c as Record<string, unknown>;
		const label = firstOf(o, 'label', 'text', 'title');
		const name = firstOf(o, 'name', 'value', 'code', 'id');
		if (label == null && name == null) return [];
		return [
			{
				name: name ?? String(i + 1),
				label: label ?? name ?? '',
				...(o.exclusive === true || o.exclusive === 'yes' ? { exclusive: true } : {})
			}
		];
	});
}

function stringToQuestion(text: string, index: number): Question {
	return {
		id: `q_${index}_${slugify(text).slice(0, 20)}`,
		name: `q_${index}`,
		label: text,
		type: inferType(text),
		required: true,
		choices: []
	};
}

type RawQuestion = Record<string, unknown>;

function isQuestion(obj: unknown): obj is RawQuestion {
	if (typeof obj !== 'object' || obj === null) return false;
	const raw = obj as RawQuestion;
	return typeof raw.label === 'string' || typeof raw.question === 'string';
}

const str = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined);

/** First of `keys` that holds a value, stringified. */
function firstOf(obj: RawQuestion, ...keys: string[]): string | undefined {
	for (const k of keys) if (obj[k] != null) return String(obj[k]);
	return undefined;
}

function normalizeQuestion(obj: RawQuestion, index: number): Question {
	const label = str(obj.label) ?? str(obj.question) ?? '';
	const name = str(obj.name) ?? str(obj.variable_name) ?? `q_${index}`;
	const id = obj.id != null ? String(obj.id) : `q_${index}`;
	const rawType = str(obj.type)?.trim() ?? '';
	// XLSForm types like "select_one list_name" or "select_multiple list_name" are valid
	const baseType = rawType.split(' ')[0];
	const rawChoices = Array.isArray(obj.choices)
		? obj.choices
		: Array.isArray(obj.options)
			? obj.options
			: [];
	const choices = normalizeChoices(rawChoices);
	const type: QuestionType = (
		KNOWN_QUESTION_TYPES.has(baseType)
			? rawType // preserve full type including list name (e.g. "select_one skala5")
			: inferType(label, choices.length > 0)
	) as QuestionType;
	const relevant = str(obj.relevant) ?? str(obj.relevance);
	// The model is asked for a justification per question (#5). It uses whichever
	// of these key names it feels like, so accept all of them.
	const rationale = firstOf(obj, 'rationale', 'reasoning', 'justification', 'why');
	const source = firstOf(obj, 'source', 'question_id', 'qwac_id');
	const researchQuestions = parseResearchQuestions(
		obj.researchQuestions ?? obj.researchQuestion ?? obj.research_questions ?? obj.rq
	);
	return {
		id,
		name,
		label,
		type,
		required: typeof obj.required === 'boolean' ? obj.required : true,
		choices,
		...(relevant ? { relevant } : {}),
		...(rationale ? { rationale } : {}),
		...(source ? { source } : {}),
		...(researchQuestions.length ? { researchQuestions } : {})
	};
}

/** 1, [1, 2], "1, 2", "RQ2" or "FF 1" → the research question numbers. */
function parseResearchQuestions(raw: unknown): number[] {
	const parts = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
	const numbers = parts.flatMap((p) =>
		[...String(p).matchAll(/\d+/g)].map((m) => Number(m[0])).filter((n) => n >= 1)
	);
	return [...new Set(numbers)].sort((a, b) => a - b);
}

let counter = 0;

export function extractQuestions(data: unknown): Question[] {
	counter = 0;
	return _extract(data);
}

function _extract(data: unknown): Question[] {
	if (Array.isArray(data)) {
		return data.flatMap((item) => _extract(item));
	}
	if (typeof data === 'string') {
		const text = data.trim();
		if (!text) return [];
		return [stringToQuestion(text, counter++)];
	}
	if (isQuestion(data)) {
		return [normalizeQuestion(data, counter++)];
	}
	if (typeof data === 'object' && data !== null) {
		// Handle {questions: [...]} or {items: [...]}
		const obj = data as Record<string, unknown>;
		if (Array.isArray(obj.questions)) return _extract(obj.questions);
		if (Array.isArray(obj.items)) return _extract(obj.items);
		// Flatten all values recursively
		return Object.values(obj).flatMap((v) => _extract(v));
	}
	return [];
}
