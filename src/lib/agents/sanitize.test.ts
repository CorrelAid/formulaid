import { describe, it, expect } from 'vitest';
import { XLSFormGenerator, XLSFormValidator, sanitizeSurvey } from './index.js';
import type { Survey } from './types.js';

const messy: Survey = {
	title: 'Sanitize test',
	questions: [
		{
			id: '1',
			type: 'select_one',
			name: 'employment_status',
			label: 'Erwerbsstatus?',
			required: true,
			choices: [
				{ name: 'full_time', label: 'Vollzeit' },
				{ name: 'full_timeish', label: 'Fast Vollzeit' },
				{ name: 'none', label: 'Keine' }
			]
		},
		{
			id: '2',
			type: 'text',
			name: 'hours_worked_per_week_detail',
			label: 'Wie viele Stunden?',
			required: false,
			relevant:
				"selected(${employment_status}, 'full_time') or ${employment_status} = 'full_timeish'"
		},
		// Demographic question with the same name as a generated one.
		{ id: '3', type: 'text', name: 'employment_status', label: 'Doppelt', required: false },
		// Umlauts in names and choice codes (seen in a real run).
		{
			id: '6',
			type: 'select_one',
			name: 'aktivitätshäufigkeit',
			label: 'Wie oft?',
			required: false,
			choices: [
				{ name: 'täglich', label: 'Täglich' },
				{ name: 'wöchentlich', label: 'Wöchentlich' }
			]
		},
		// Already-valid name, then a duplicate that references it.
		{ id: '4', type: 'text', name: 'age', label: 'Alter', required: false },
		{
			id: '5',
			type: 'text',
			name: 'age',
			label: 'Alter 2',
			required: false,
			relevant: '${age} != 0'
		}
	]
};

describe('sanitizeSurvey', () => {
	it('leaves no name or answer-code findings for the validator', () => {
		const findings = new XLSFormValidator().validate(
			new XLSFormGenerator().generate(sanitizeSurvey(messy))
		);
		expect(findings.filter((f) => f.severity === 'error')).toEqual([]);
	});

	it('dedupes names and keeps relevant in sync with renames and recodes', () => {
		const [first, second, third, umlaut, age, age2] = sanitizeSurvey(messy).questions;
		expect(umlaut.name).toBe('aktivitaetshaeufigke');
		expect(umlaut.choices!.map((c) => c.name)).toEqual(['taegl', 'woech']);
		expect(age.name).toBe('age');
		expect(age2.name).toBe('age1');
		expect(age2.relevant).toBe('${age} != 0');
		expect(first.name).toBe('employmentstatus');
		expect(third.name).not.toBe(first.name);
		expect(second.name.length).toBeLessThanOrEqual(20);

		const [ft, fti] = first.choices!.map((c) => c.name);
		expect(ft).not.toBe(fti);
		expect(second.relevant).toBe(
			`selected(\${employmentstatus}, '${ft}') or \${employmentstatus} = '${fti}'`
		);
	});
});

describe('sanitizeSurvey <q>_other pairs', () => {
	const other = (name: string, parent: string) => ({
		id: name,
		type: 'text' as const,
		name,
		label: 'Sonstiges',
		required: false,
		relevant: `selected(\${${parent}}, 'other')`
	});
	const parent = (name: string) => ({
		id: name,
		type: 'select_multiple' as const,
		name,
		label: 'Welche?',
		required: true,
		choices: [
			{ name: 'a', label: 'A' },
			{ name: 'other', label: 'Sonstiges' }
		]
	});

	it("keeps the companion's name paired with its parent", () => {
		const { questions } = sanitizeSurvey({
			title: 't',
			questions: [parent('vorteile'), other('vorteile_other', 'vorteile')]
		});
		expect(questions.map((q) => q.name)).toEqual(['vorteile', 'vorteile_other']);
	});

	it('shortens a long parent so parent and companion stay paired', () => {
		const { questions } = sanitizeSurvey({
			title: 't',
			questions: [
				parent('verbesserungsvorschlag'),
				other('verbesserungsvorschlag_other', 'verbesserungsvorschlag')
			]
		});
		const [p, c] = questions;
		expect(p.name.length).toBeLessThanOrEqual(15);
		expect(c.name).toBe(`${p.name}_other`);
		expect(c.relevant).toBe(`selected(\${${p.name}}, 'other')`);
	});
});
