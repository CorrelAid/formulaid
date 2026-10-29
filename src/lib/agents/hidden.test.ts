import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { xlsformToLstsv, parseLstsv } from '@correlaid/formtransform';
import { XLSFormGenerator, XLSFormValidator, extractQuestions } from './index.js';
import { qualityGap } from './lead.js';
import { isAnswerable, type Survey } from './types.js';

/** `hidden` is filled from the survey link, never by the respondent (#69). */
const generated = [
	{
		name: 'partner',
		label: 'Partnerorganisation',
		type: 'hidden',
		required: true,
		default: 'direkt'
	},
	{ name: 'zufrieden', label: 'Wie zufrieden sind Sie?', type: 'text' }
];

function workbook(survey: Survey): Uint8Array {
	return new XLSFormGenerator().generate(survey);
}

describe('hidden questions (#69)', () => {
	const questions = extractQuestions(generated);
	const survey: Survey = { title: 'Hidden', formId: 'hidden', language: 'de', questions };

	it('parses the default and never makes a hidden field required', () => {
		expect(questions[0]).toMatchObject({ type: 'hidden', required: false, default: 'direkt' });
		expect(questions[1].default).toBeUndefined();
	});

	it('is not an answerable question', () => {
		expect(questions.map(isAnswerable)).toEqual([false, true]);
		// One answerable question counts as one, not two, towards the minimum.
		expect(qualityGap(questions)).toBe(qualityGap([questions[1]]));
	});

	it('writes the default column and leaves required empty', () => {
		const wb = XLSX.read(workbook(survey), { type: 'array' });
		const rows = XLSX.utils.sheet_to_json<Record<string, string>>(wb.Sheets['survey']);
		expect(rows[0]).toMatchObject({ type: 'hidden', name: 'partner', default: 'direkt' });
		expect(rows[0].required ?? '').toBe('');
		expect(rows[1].required).toBe('yes');
		expect(rows[1].default ?? '').toBe('');
	});

	it('writes no default column when no question has a default', () => {
		const wb = XLSX.read(workbook({ ...survey, questions: [questions[1]] }), { type: 'array' });
		const header = XLSX.utils.sheet_to_json<string[]>(wb.Sheets['survey'], { header: 1 })[0];
		expect(header).toEqual(['type', 'name', 'label', 'hint', 'required', 'relevant']);
	});

	it('passes the validator and becomes a hidden LimeSurvey question with its default', async () => {
		const bytes = workbook(survey);
		expect(new XLSFormValidator().validate(bytes)).toEqual([]);
		const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
		const rows = parseLstsv(await xlsformToLstsv(buffer as ArrayBuffer));
		const q = rows.find((r) => r.class === 'Q' && r.name === 'partner');
		expect(q).toMatchObject({ 'type/scale': 'S', hidden: '1', default: 'direkt' });
	});
});
