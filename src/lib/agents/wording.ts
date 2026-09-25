import type { Question } from './types.js';

const ARTICLE = String.raw`(?:(?:der|die|das|dem|den|des|ihre[mnrs]?|deine[mnrs]?|unsere[mnrs]?|eure[mnrs]?)\s+)?`;
/** Two capitalised (German) nouns joined by und/oder/sowie:
 *  "der Kommunikation und Zusammenarbeit", "die Kommunikation und den
 *  Informationsfluss". A hyphenated first part ("Berufs- und Privatleben")
 *  is one thing and doesn't match. */
const TWO_THINGS = new RegExp(
	String.raw`\b([A-ZÄÖÜ][a-zäöüß]{2,})\s+(?:und|oder|sowie)\s+${ARTICLE}([A-ZÄÖÜ][\wäöüß-]{2,})`,
	'u'
);

/**
 * Rating questions that ask about two things at once (a double stimulus, the
 * Umfragenwerkstatt's rule 4 in „Fragen formulieren"): one answer can't rate
 * both (#46). Only `select_one` with a scale (≥ 3 answers) is checked, where it
 * matters most and the pattern is reliable; "X oder Nicht-X" is one thing.
 */
export function doubleBarrelled(questions: Question[]): Question[] {
	return questions.filter((q) => {
		if (!q.type.startsWith('select_one') || (q.choices?.length ?? 0) < 3) return false;
		const m = TWO_THINGS.exec(q.label);
		if (!m) return false;
		const [, first, second] = m;
		return !second.toLowerCase().includes(first.toLowerCase());
	});
}
