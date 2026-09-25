import { describe, it, expect } from 'vitest';
import { doubleBarrelled } from './wording.js';
import type { Question } from './types.js';

const scale = [1, 2, 3, 4, 5].map((n) => ({ name: String(n), label: String(n) }));
const rating = (label: string): Question => ({
	id: label,
	name: 'q',
	label,
	type: 'select_one',
	required: true,
	choices: scale
});
const flagged = (label: string) => doubleBarrelled([rating(label)]).length === 1;

describe('doubleBarrelled (#46)', () => {
	it('flags two things in one rating question', () => {
		expect(
			flagged(
				'Wie bewerten Sie die Kommunikation und den Informationsfluss innerhalb unserer Organisation?'
			)
		).toBe(true);
		expect(
			flagged('Wie zufrieden sind Sie mit der Kommunikation und Zusammenarbeit mit Ihrem Team?')
		).toBe(true);
	});

	it('leaves one thing alone', () => {
		expect(flagged('Wie gut gelingt es Ihnen, Berufs- und Privatleben zu trennen?')).toBe(false);
		expect(flagged('Was ist der Hauptgrund für Ihre Empfehlung oder Nicht-Empfehlung?')).toBe(
			false
		);
		expect(flagged('Wie zufrieden sind Sie insgesamt mit dem Programm?')).toBe(false);
	});

	it('only checks rating questions', () => {
		const q = {
			...rating('Welche Kurse und Treffen besuchst du?'),
			type: 'select_multiple' as const
		};
		expect(doubleBarrelled([q])).toEqual([]);
		expect(
			doubleBarrelled([
				{ ...rating('Kommunikation und Zusammenarbeit?'), choices: scale.slice(0, 2) }
			])
		).toEqual([]);
	});
});
