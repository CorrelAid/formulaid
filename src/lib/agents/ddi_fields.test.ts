import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { xlsformToDdi } from '@correlaid/formtransform';
import { XLSFormGenerator, XLSFormValidator, extractQuestions } from './index.js';
import type { Survey } from './types.js';

/** concept, label_short and the short title / subtitle are optional (#70). */
const generated = [
	{
		name: 'zufrieden',
		label: 'Wie zufrieden sind Sie mit Ihrer Arbeit?',
		type: 'select_one',
		concept: 'Arbeitszufriedenheit',
		choices: [
			{ name: '1', label: 'gar nicht' },
			{ name: '2', label: 'sehr' }
		]
	},
	{
		name: 'angebote',
		label: 'Welche Angebote nutzen Sie?',
		type: 'select_multiple',
		label_short: 'Genutzte Angebote',
		choices: [
			{ name: 'kurs', label: 'Kurse' },
			{ name: 'treff', label: 'Treffen' }
		]
	}
];

const questions = extractQuestions(generated);
const survey: Survey = {
	title: 'Befragung der Mitarbeitenden zur Zufriedenheit',
	titleShort: 'Mitarbeitendenbefragung',
	subtitle: 'Welle 2026',
	formId: 'ddi_fields',
	language: 'de',
	questions
};

function sheets(s: Survey) {
	const wb = XLSX.read(new XLSFormGenerator().generate(s), { type: 'array' });
	const rows = (name: string) =>
		XLSX.utils.sheet_to_json<string[]>(wb.Sheets[name], { header: 1 }) as string[][];
	return { survey: rows('survey'), settings: rows('settings') };
}

describe('concept, label_short, form_title_short and form_subtitle (#70)', () => {
	it('parses concept and label_short', () => {
		expect(questions[0]).toMatchObject({ concept: 'Arbeitszufriedenheit' });
		expect(questions[0].labelShort).toBeUndefined();
		expect(questions[1]).toMatchObject({ labelShort: 'Genutzte Angebote' });
		expect(questions[1].concept).toBeUndefined();
	});

	it('writes the columns and settings only when they are used', () => {
		const used = sheets(survey);
		expect(used.survey[0]).toEqual([
			'type',
			'name',
			'label',
			'hint',
			'required',
			'relevant',
			'concept',
			'label_short'
		]);
		expect(used.settings[0]).toContain('form_title_short');
		expect(used.settings[0]).toContain('form_subtitle');

		const plain = sheets({
			title: 'Plain',
			questions: questions.map((q) => {
				const rest = { ...q };
				delete rest.concept;
				delete rest.labelShort;
				return rest;
			})
		});
		expect(plain.survey[0]).toEqual(['type', 'name', 'label', 'hint', 'required', 'relevant']);
		expect(plain.settings[0]).toEqual(['form_title', 'form_id']);
	});

	it('passes the validator and reaches the DDI', () => {
		const bytes = new XLSFormGenerator().generate(survey);
		expect(new XLSFormValidator().validate(bytes)).toEqual([]);
		const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
		const ddi = xlsformToDdi(buffer as ArrayBuffer);
		expect(ddi).toMatch(/<concept[^>]*>Arbeitszufriedenheit<\/concept>/);
		expect(ddi).toMatch(/<varGrp\b[^>]*>\s*<labl[^>]*>Genutzte Angebote<\/labl>/);
		expect(ddi).toMatch(/<altTitl[^>]*>Mitarbeitendenbefragung<\/altTitl>/);
		expect(ddi).toMatch(/<subTitl[^>]*>Welle 2026<\/subTitl>/);
		// Only the question with a concept gets one: it is not copied from the label.
		expect(ddi.match(/<concept\b/g)).toHaveLength(1);
	});
});
