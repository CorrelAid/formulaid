import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { XLSFormGenerator, XLSFormValidator, extractQuestions } from './index.js';
import type { Survey } from './types.js';

const survey: Survey = {
	title: 'Explanations test',
	reasoning: 'Zwei Konstrukte: Zufriedenheit und Bindung.',
	questions: [
		{
			id: '1',
			type: 'text',
			name: 'firstquestion',
			label: 'Was gefällt Ihnen an Ihrer Arbeit?',
			required: false,
			rationale: 'Offener Einstieg zum Konstrukt Zufriedenheit.',
			source: 'qwac:abc123'
		}
	]
};

describe('XLSFormGenerator explanations sheet', () => {
	it('writes rationale, source and the overall reasoning', () => {
		const buf = new XLSFormGenerator().generate(survey);
		const wb = XLSX.read(buf, { type: 'array' });

		expect(wb.SheetNames).toContain('explanations');
		const rows = XLSX.utils.sheet_to_json<string[]>(wb.Sheets['explanations'], { header: 1 });
		const flat = rows.flat().join(' | ');
		expect(flat).toContain('Offener Einstieg zum Konstrukt Zufriedenheit.');
		expect(flat).toContain('qwac:abc123');
		expect(flat).toContain('Zwei Konstrukte');
		expect(flat).toContain('kein fertiges Ergebnis');
	});

	it('keeps the workbook valid — converters ignore the extra sheet', () => {
		const buf = new XLSFormGenerator().generate(survey);
		expect(new XLSFormValidator().validate(buf)).toEqual([]);
	});
});

describe('extractQuestions', () => {
	it('carries rationale and source through from the model output', () => {
		const [q] = extractQuestions([
			{
				name: 'satisfaction',
				label: 'Wie zufrieden sind Sie?',
				type: 'integer',
				rationale: 'Kernindikator.',
				source: 'qwac:xyz'
			}
		]);
		expect(q).toMatchObject({ rationale: 'Kernindikator.', source: 'qwac:xyz' });
	});

	it('accepts the alternative key names the model tends to use', () => {
		const [q] = extractQuestions([
			{ label: 'Warum?', type: 'text', justification: 'Kontextfrage.', qwac_id: 'q-42' }
		]);
		expect(q).toMatchObject({ rationale: 'Kontextfrage.', source: 'q-42' });
	});
});
