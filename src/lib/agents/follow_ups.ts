import type { Choice, Question } from './types.js';

/**
 * Follow-up questions: a `text` question that only makes sense after a
 * particular answer to the select just before it, like "Falls Sonstiges:
 * bitte angeben" after a list with a Sonstiges option, or "Falls ja, welche?"
 * after a yes/no question. Without a `relevant` they show to everyone (#51).
 *
 * Detection is structural, not by name alone: the question must say it is a
 * follow-up (label or name) *and* sit right after a select that offers the
 * matching answer. That survives sanitizing (`bereich_sonstiges` becomes
 * `bereichsonstiges`, #53), ignores a closing "Sonstige Anmerkungen?", and
 * catches "Falls ja" (#54).
 */

type Kind = 'other' | 'yes';

const OTHER_LABEL =
	/^(?:(?:falls|wenn|if)\b[^?]*\b(?:sonstig\w*|andere\w*|other)\b|(?:sonstiges|anderes?|other)\s*[:(,–-])|\b(?:bitte (?:angeben|nennen|spezifizieren|konkretisieren)|please specify)\b/i;
const YES_LABEL = /^(?:falls|wenn|if)\s+(?:ja|yes)\b/i;
/** Raw (`bereich_sonstiges`, `bereich_other`) and sanitized (`bereichsonstiges`). */
const OTHER_NAME = /(?:sonstiges|sonst|other)$/i;

/** What kind of follow-up a question announces, if any. */
function announcedKind(q: Question): Kind | null {
	const label = q.label.trim();
	if (YES_LABEL.test(label)) return 'yes';
	if (OTHER_LABEL.test(label) || OTHER_NAME.test(q.name)) return 'other';
	return null;
}

function choiceKind(c: Choice): Kind | null {
	const code = String(c.name).toLowerCase();
	const label = String(c.label).trim().toLowerCase();
	if (/^(?:other|sonst\w*|andere\w*)$/.test(code) || /^(?:sonstig|andere|other)/.test(label)) {
		return 'other';
	}
	if (/^(?:ja|yes)$/.test(code) || /^(?:ja|yes)\b/.test(label)) return 'yes';
	return null;
}

const isSelect = (q: Question) => /^select_(?:one|multiple)\b/.test(q.type);

export interface FollowUp {
	/** Index of the follow-up in the list it was found in. */
	index: number;
	kind: Kind;
	parent: Question | null;
	parentIndex: number;
	/** The parent's choice codes that open this follow-up. */
	codes: string[];
}

/**
 * Every follow-up in `questions`, whether or not it already has a `relevant`.
 * The parent is the nearest select before it, looking past other follow-ups
 * (a list may have both "Falls ja" and "Falls Sonstiges" after it). A question
 * that announces itself as a follow-up but has no matching parent is still
 * reported, with `parent: null`: it has nothing to depend on.
 */
export function findFollowUps(questions: Question[]): FollowUp[] {
	const found: FollowUp[] = [];
	const followUpIndexes = new Set<number>();
	questions.forEach((q, i) => {
		if (q.type !== 'text') return;
		const kind = announcedKind(q);
		if (!kind) return;
		let j = i - 1;
		while (j >= 0 && followUpIndexes.has(j)) j--;
		const candidate = j >= 0 && isSelect(questions[j]) ? questions[j] : null;
		const codes = (candidate?.choices ?? [])
			.filter((c) => choiceKind(c) === kind)
			.map((c) => String(c.name));
		// A name like "bereichother" alone is too weak without a parent that
		// offers the answer; a label that says "Falls Sonstiges" is not.
		const byLabelOnly = OTHER_LABEL.test(q.label.trim()) || YES_LABEL.test(q.label.trim());
		if (!codes.length && !byLabelOnly) return;
		followUpIndexes.add(i);
		found.push({
			index: i,
			kind,
			parent: codes.length ? candidate : null,
			parentIndex: codes.length ? j : -1,
			codes
		});
	});
	return found;
}

function relevantFor(parent: Question, code: string): string {
	return parent.type.startsWith('select_multiple')
		? `selected(\${${parent.name}}, '${code}')`
		: `\${${parent.name}} = '${code}'`;
}

/**
 * Give every follow-up without `relevant` the obvious one, when the parent
 * offers exactly one matching answer. A mechanical fix like the ones in
 * sanitize.ts: done in code, so the repair loop only sees real ambiguity.
 *
 * A Sonstiges follow-up is also brought into the registry's convention: the
 * answer's code becomes `other` and the follow-up `<parent>_other`, with
 * `relevant` on `'other'`. formtransform recognises exactly that pair and
 * turns it into LimeSurvey's own "other" field; any other name or code gives
 * a separate text question. Done only when nothing else refers to the old
 * code and `other` is free in the parent's list.
 *
 * Run before sanitizing; sanitizeSurvey then follows the renames.
 */
export function linkFollowUps(questions: Question[]): Question[] {
	const out = [...questions];
	const names = new Set(questions.map((q) => q.name));
	for (const f of findFollowUps(questions)) {
		const q = out[f.index];
		if (q.relevant?.trim() || !f.parent || f.codes.length !== 1) continue;
		let parent = out[f.parentIndex];
		let code = f.codes[0];
		let name = q.name;
		if (f.kind === 'other') {
			const companion = `${parent.name}_other`;
			const otherFree = !(parent.choices ?? []).some((c) => c.name === 'other' && c.name !== code);
			const codeUnused = out.every((x, k) => k === f.index || !x.relevant?.includes(`'${code}'`));
			if (otherFree && codeUnused && (companion === q.name || !names.has(companion))) {
				parent = {
					...parent,
					choices: parent.choices!.map((c) => (c.name === code ? { ...c, name: 'other' } : c))
				};
				out[f.parentIndex] = parent;
				code = 'other';
				name = companion;
				names.add(companion);
			}
		}
		out[f.index] = { ...q, name, relevant: relevantFor(parent, code) };
	}
	return out;
}

/** Follow-ups that still have no `relevant` (no parent, or several answers
 *  that could open them). */
export function orphanedFollowUps(questions: Question[]): Question[] {
	return findFollowUps(questions)
		.map((f) => questions[f.index])
		.filter((q) => !q.relevant?.trim());
}

/** Wording that limits a question to some respondents ("Falls Sie …",
 *  "…, wenn du … nicht …", "If you …"). Such a question needs a `relevant`
 *  on the answer that decides it (#46). */
const CONDITIONAL =
	/^(?:falls|wenn|sofern|if)\s+(?:sie|du|ihr|you)\b|,\s*(?:wenn|falls|sofern)\s+(?:sie|du|ihr)\b|\bif you\b/i;

/** Questions whose wording is conditional but that have no `relevant`, other
 *  than the follow-ups (reported separately). */
export function unconditionedQuestions(questions: Question[]): Question[] {
	const followUps = new Set(findFollowUps(questions).map((f) => f.index));
	return questions.filter(
		(q, i) =>
			q.type !== 'note' && !followUps.has(i) && !q.relevant?.trim() && CONDITIONAL.test(q.label)
	);
}

/** Text questions that are open questions in their own right: not a
 *  follow-up and not shown conditionally (#55). */
export function openQuestions(questions: Question[]): Question[] {
	const followUps = new Set(findFollowUps(questions).map((f) => f.index));
	return questions.filter((q, i) => q.type === 'text' && !followUps.has(i) && !q.relevant?.trim());
}
