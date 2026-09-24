import { QUESTION_TYPES } from '@correlaid/formtransform';
import type { Question, QuestionType } from './types.js';

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

function isQuestion(obj: any): boolean {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		(typeof obj.label === 'string' || typeof obj.question === 'string')
	);
}

function normalizeQuestion(obj: any, index: number): Question {
	const label: string = obj.label ?? obj.question ?? '';
	const name: string = obj.name ?? obj.variable_name ?? `q_${index}`;
	const id: string = obj.id != null ? String(obj.id) : `q_${index}`;
	const rawType: string = typeof obj.type === 'string' ? obj.type.trim() : '';
	// XLSForm types like "select_one list_name" or "select_multiple list_name" are valid
	const baseType = rawType.split(' ')[0];
	const type: QuestionType = (
		KNOWN_QUESTION_TYPES.has(baseType)
			? rawType // preserve full type including list name (e.g. "select_one skala5")
			: inferType(label)
	) as QuestionType;
	const choices = Array.isArray(obj.choices)
		? obj.choices
		: Array.isArray(obj.options)
			? obj.options.map((o: any, i: number) => ({ name: `c_${i}`, label: String(o) }))
			: [];
	const relevant: string | undefined = obj.relevant ?? obj.relevance ?? undefined;
	// The model is asked for a justification per question (#5). It uses whichever
	// of these key names it feels like, so accept all of them.
	const rationale: string | undefined =
		obj.rationale ?? obj.reasoning ?? obj.justification ?? obj.why ?? undefined;
	const source: string | undefined = obj.source ?? obj.question_id ?? obj.qwac_id ?? undefined;
	return {
		id,
		name,
		label,
		type,
		required: obj.required ?? true,
		choices,
		...(relevant ? { relevant } : {}),
		...(rationale ? { rationale: String(rationale) } : {}),
		...(source ? { source: String(source) } : {})
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
