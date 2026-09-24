import { FieldSanitizer } from '@correlaid/formtransform';
import type { Choice, Survey } from './types.js';

/** Companion rows of select_*_other keep this suffix; the validator strips it
 *  before checking the name, so it must survive sanitizing too. */
const OTHER_SUFFIX = '_other';

/**
 * Fix the findings that are purely mechanical before the workbook is
 * validated, so only real problems reach the repair loop (#17): names and
 * choice codes are stripped and truncated to the registry's rules, duplicates
 * (including generated vs. demographic questions) get a numeric suffix, and
 * references in `relevant` follow the renames.
 *
 * The rules come from formtransform's FieldSanitizer, the same code the
 * converters use, so nothing is reimplemented here.
 */
export function sanitizeSurvey(survey: Survey): Survey {
	const sanitizer = new FieldSanitizer();
	// Length limits, read back from the sanitizer instead of hardcoding them.
	const maxName = sanitizer.sanitizeName('x'.repeat(100)).length;
	const maxCode = sanitizer.sanitizeAnswerCode('x'.repeat(100)).length;

	const renamed = new Map<string, string>();
	const seen = new Set<string>();
	// Per original question name: original choice code → new code.
	const recoded = new Map<string, Map<string, string>>();

	const questions = survey.questions.map((q, i) => {
		const name = sanitizeName(sanitizer, q.name, `q${i + 1}`, maxName);
		// A reference to a duplicated name means the first question that has it.
		const first = !seen.has(q.name);
		seen.add(q.name);
		if (first && name !== q.name) renamed.set(q.name, name);
		if (!q.choices) return { ...q, name };
		const codes = new Map<string, string>();
		if (first) recoded.set(q.name, codes);
		return { ...q, name, choices: sanitizeChoices(sanitizer, q.choices, maxCode, codes) };
	});

	return {
		...survey,
		questions: questions.map((q) =>
			q.relevant ? { ...q, relevant: rewriteRelevant(q.relevant, renamed, recoded) } : q
		)
	};
}

function sanitizeName(
	sanitizer: FieldSanitizer,
	raw: string,
	fallback: string,
	maxName: number
): string {
	const isOther = raw.endsWith(OTHER_SUFFIX);
	const base = isOther ? raw.slice(0, -OTHER_SUFFIX.length) : raw;
	const name = sanitizer.sanitizeNameUnique(base) || sanitizer.sanitizeNameUnique(fallback);
	// LimeSurvey appends "other" to the base, so the base has to leave room.
	return isOther ? name.slice(0, maxName - 'other'.length) + OTHER_SUFFIX : name;
}

function sanitizeChoices(
	sanitizer: FieldSanitizer,
	choices: Choice[],
	maxCode: number,
	codes: Map<string, string>
): Choice[] {
	const used = new Set<string>();
	return choices.map((c, i) => {
		const original = String(c.name ?? '');
		let code = sanitizer.sanitizeAnswerCode(original) || `c${i + 1}`;
		// Truncating to the code limit can collide within one list.
		for (let n = 1; used.has(code); n++) {
			const suffix = String(n);
			code = code.slice(0, maxCode - suffix.length) + suffix;
		}
		used.add(code);
		if (code !== original) codes.set(original, code);
		return { ...c, name: code };
	});
}

/** Follow renames in `${name}` references, and recoded choice codes in the two
 *  comparison forms XLSForm uses: `selected(${q}, 'code')` and `${q} = 'code'`. */
function rewriteRelevant(
	expr: string,
	renamed: Map<string, string>,
	recoded: Map<string, Map<string, string>>
): string {
	const code = (ref: string, value: string) => recoded.get(ref)?.get(value) ?? value;
	return expr
		.replace(
			/selected\(\s*\$\{([^}]+)\}\s*,\s*(['"])([^'"]*)\2\s*\)/g,
			(_m, ref: string, q: string, value: string) =>
				`selected(\${${ref.trim()}}, ${q}${code(ref.trim(), value)}${q})`
		)
		.replace(
			/\$\{([^}]+)\}(\s*!?=\s*)(['"])([^'"]*)\3/g,
			(_m, ref: string, op: string, q: string, value: string) =>
				`\${${ref.trim()}}${op}${q}${code(ref.trim(), value)}${q}`
		)
		.replace(/\$\{([^}]+)\}/g, (match, ref: string) => {
			const target = renamed.get(ref.trim());
			return target ? `\${${target}}` : match;
		});
}
