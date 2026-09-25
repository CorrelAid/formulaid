import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { XLSFormGenerator, XLSFormValidator } from './index.js';
import type { Question, Survey } from './types.js';

const scale = (name: string, type: Question['type'], labels: string[]): Question => ({
	id: name,
	type,
	name,
	label: `${name}?`,
	required: true,
	choices: labels.map((label, i) => ({ name: String(i + 1), label }))
});

function sheets(survey: Survey) {
	const wb = XLSX.read(new XLSFormGenerator().generate(survey), { type: 'array' });
	return {
		survey: XLSX.utils.sheet_to_json<Record<string, string>>(wb.Sheets['survey']),
		choices: XLSX.utils.sheet_to_json<Record<string, string>>(wb.Sheets['choices'])
	};
}

describe('XLSFormGenerator choice lists (#25)', () => {
	it('gives a shared list name with different choices its own list', () => {
		const survey: Survey = {
			title: 'Lists',
			questions: [
				scale('sat', 'select_one skala5' as Question['type'], ['gar nicht', 'sehr']),
				scale('imp', 'select_one skala5' as Question['type'], ['unwichtig', 'wichtig', 'x'])
			]
		};
		const { survey: rows, choices } = sheets(survey);
		expect(rows.map((r) => r.type)).toEqual(['select_one skala5', 'select_one imp_list']);
		expect(choices.filter((c) => c.list_name === 'skala5').map((c) => c.label)).toEqual([
			'gar nicht',
			'sehr'
		]);
		expect(choices.filter((c) => c.list_name === 'imp_list')).toHaveLength(3);
		expect(new XLSFormValidator().validate(new XLSFormGenerator().generate(survey))).toEqual([]);
	});

	it('writes a list reused with identical choices only once', () => {
		const labels = ['nie', 'manchmal', 'oft'];
		const { survey: rows, choices } = sheets({
			title: 'Lists',
			questions: [
				scale('a', 'select_one freq' as Question['type'], labels),
				scale('b', 'select_one freq' as Question['type'], labels)
			]
		});
		expect(rows.map((r) => r.type)).toEqual(['select_one freq', 'select_one freq']);
		expect(choices).toHaveLength(3);
	});

	it('writes exclusive only for select_multiple', () => {
		const choices = [
			{ name: 'a', label: 'A' },
			{ name: 'ka', label: 'Keine Angabe', exclusive: true }
		];
		const { choices: rows } = sheets({
			title: 'Exclusive',
			questions: [
				{ id: 'm', type: 'select_multiple', name: 'm', label: 'M?', required: true, choices },
				{ id: 'o', type: 'select_one', name: 'o', label: 'O?', required: true, choices }
			]
		});
		const flag = (list: string) =>
			rows.filter((r) => r.list_name === list).map((r) => r.exclusive ?? '');
		expect(flag('m_list')).toEqual(['', 'yes']);
		expect(flag('o_list')).toEqual(['', '']);
	});
});
