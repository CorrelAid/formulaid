import { describe, it, expect } from 'vitest';
import { XLSFormGenerator, XLSFormValidator } from './index.js';
import type { Survey } from './types.js';

describe('XLSFormValidator', () => {
	it('returns no findings for a well-formed survey', () => {
		const generator = new XLSFormGenerator();
		const validator = new XLSFormValidator();

		const good: Survey = {
			title: 'Sanity test',
			questions: [
				{
					id: '1',
					type: 'text',
					name: 'firstquestion',
					label: 'What is your first question?',
					required: false
				}
			]
		};

		const buf = generator.generate(good);
		const findings = validator.validate(buf);
		expect(findings).toEqual([]);
	});

	it('flags an unsupported question type', () => {
		const generator = new XLSFormGenerator();
		const validator = new XLSFormValidator();

		const bad: Survey = {
			title: 'Bad type test',
			questions: [
				{
					id: '1',
					type: 'rank' as unknown as Survey['questions'][number]['type'],
					name: 'ranksomething',
					label: 'Rank the following:',
					required: false
				}
			]
		};

		const buf = generator.generate(bad);
		const findings = validator.validate(buf);
		expect(findings.some((f) => f.message.includes('rank'))).toBe(true);
	});
});
