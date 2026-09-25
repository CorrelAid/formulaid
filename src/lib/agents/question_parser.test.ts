import { describe, it, expect } from 'vitest';
import { extractQuestions } from './question_parser.js';

describe('extractQuestions choices (#26)', () => {
	it('turns plain strings into labelled choices', () => {
		const [q] = extractQuestions([
			{ label: 'Farbe?', type: 'select_one', choices: ['Rot', 'Blau'] }
		]);
		expect(q.choices).toEqual([
			{ name: '1', label: 'Rot' },
			{ name: '2', label: 'Blau' }
		]);
	});

	it('accepts {value, label}, {code, label} and keeps exclusive', () => {
		const [q] = extractQuestions([
			{
				label: 'Was nutzt du?',
				type: 'select_multiple',
				choices: [
					{ value: 'bus', label: 'Bus' },
					{ code: 'rad', label: 'Rad' },
					{ name: 'none', label: 'Nichts davon', exclusive: true }
				]
			}
		]);
		expect(q.choices).toEqual([
			{ name: 'bus', label: 'Bus' },
			{ name: 'rad', label: 'Rad' },
			{ name: 'none', label: 'Nichts davon', exclusive: true }
		]);
	});

	it('falls back to the code for an empty label and drops empty choices', () => {
		const [q] = extractQuestions([
			{
				label: 'Stufe?',
				type: 'select_one',
				choices: [{ name: 'a1', label: '' }, { name: '', label: ' ' }, 'B']
			}
		]);
		expect(q.choices).toEqual([
			{ name: 'a1', label: 'a1' },
			{ name: '3', label: 'B' }
		]);
	});

	it('normalizes the options key too', () => {
		const [q] = extractQuestions([{ label: 'Ja?', type: 'select_one', options: ['Ja', 'Nein'] }]);
		expect(q.choices?.map((c) => c.label)).toEqual(['Ja', 'Nein']);
	});
});

describe('extractQuestions unknown types (#27)', () => {
	it('keeps the choices of an unknown type as select_one', () => {
		const [q] = extractQuestions([
			{ label: 'Wie zufrieden bist du?', type: 'likert', choices: ['gar nicht', 'sehr'] }
		]);
		expect(q.type).toBe('select_one');
		expect(q.choices).toHaveLength(2);
	});

	it('uses select_multiple for multi-choice wording', () => {
		const [q] = extractQuestions([
			{
				label: 'Welche Angebote nutzt du? Wähle alle, die zutreffen.',
				type: 'checkbox',
				choices: ['A', 'B']
			}
		]);
		expect(q.type).toBe('select_multiple');
	});

	it('uses text, never integer or a select without choices, when there are no choices', () => {
		const [q] = extractQuestions([{ label: 'Wie zufrieden bist du?', type: 'rating' }]);
		expect(q.type).toBe('text');
	});
});

describe('extractQuestions research questions (#34)', () => {
	it('reads the numbers in whatever shape the model sends', () => {
		const qs = extractQuestions([
			{ label: 'A?', type: 'text', researchQuestions: [2, 1, 2] },
			{ label: 'B?', type: 'text', researchQuestion: 'FF 3' },
			{ label: 'C?', type: 'text', rq: '1, 2' },
			{ label: 'D?', type: 'text' }
		]);
		expect(qs.map((q) => q.researchQuestions)).toEqual([[1, 2], [3], [1, 2], undefined]);
	});
});
