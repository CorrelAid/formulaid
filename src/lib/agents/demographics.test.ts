import { describe, it, expect } from 'vitest';
import { demographicVariables } from '../constants.js';
import {
	XLSFormGenerator,
	XLSFormValidator,
	demographicQuestions,
	sanitizeSurvey
} from './index.js';

describe('demographicQuestions (#28)', () => {
	it('codes answers 1..n and keeps them through sanitizing', () => {
		const survey = sanitizeSurvey({
			title: 'Demografie',
			questions: demographicQuestions(['sex', 'marital_status'])
		});
		expect(survey.questions[0].choices).toEqual([
			{ name: '1', label: 'Männlich' },
			{ name: '2', label: 'Weiblich' },
			{ name: '3', label: 'Divers' }
		]);
		expect(survey.questions[1].choices?.map((c) => c.name)).toEqual(['1', '2', '3', '4', '5']);
	});

	it('builds a valid workbook from every standard', () => {
		const survey = sanitizeSurvey({
			title: 'Demografie',
			questions: demographicQuestions(demographicVariables.map((v) => v.question_name))
		});
		const findings = new XLSFormValidator().validate(new XLSFormGenerator().generate(survey));
		expect(findings.filter((f) => f.severity === 'error')).toEqual([]);
	});
});
