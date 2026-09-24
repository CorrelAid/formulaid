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

function inferType(text: string): QuestionType {
	const t = text.toLowerCase();
	if (/\b(skala|bewert|1.*(bis|to).*10|zufrieden|wie (sehr|gut|häufig|oft))\b/.test(t))
		return 'integer';
	if (/\b(welche.*alle|mehrere|alle.*die|auswählen)\b/.test(t)) return 'select_multiple';
	if (/\b(welche[rs]?|wählen|trifft.*zu|falls ja)\b/.test(t)) return 'select_one';
	return 'text';
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
	const type: QuestionType = (
		KNOWN_QUESTION_TYPES.has(baseType)
			? rawType // preserve full type including list name (e.g. "select_one skala5")
			: inferType(label)
	) as QuestionType;
	const choices: Choice[] = Array.isArray(obj.choices)
		? obj.choices
		: Array.isArray(obj.options)
			? obj.options.map((o: unknown, i: number) => ({ name: `c_${i}`, label: String(o) }))
			: [];
	const relevant = str(obj.relevant) ?? str(obj.relevance);
	// The model is asked for a justification per question (#5). It uses whichever
	// of these key names it feels like, so accept all of them.
	const rationale = firstOf(obj, 'rationale', 'reasoning', 'justification', 'why');
	const source = firstOf(obj, 'source', 'question_id', 'qwac_id');
	return {
		id,
		name,
		label,
		type,
		required: typeof obj.required === 'boolean' ? obj.required : true,
		choices,
		...(relevant ? { relevant } : {}),
		...(rationale ? { rationale } : {}),
		...(source ? { source } : {})
	};
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
