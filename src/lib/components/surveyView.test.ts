import { describe, it, expect } from 'vitest';
import { detectDemographicsStart } from './surveyView';
import type { Question } from '$lib/agents/types';

const qwac = (id: string, name: string): Question => ({
	id,
	name,
	label: name,
	type: 'text',
	required: true
});

const generated = (name: string, opts: { rationale?: string } = {}): Question => ({
	id: `q_gen_${name}`,
	name,
	label: name,
	type: 'text',
	required: true,
	...(opts.rationale ? { rationale: opts.rationale } : {})
});

describe('detectDemographicsStart (#47)', () => {
	const AGE_ID = 'bda5c010ec81';
	const SEX_ID = '6c19ba5f8ce9';

	it('returns -1 when no demographics were selected', () => {
		const questions = [
			generated('q1', { rationale: 'why' }),
			generated('q2', { rationale: 'why' })
		];
		expect(detectDemographicsStart(questions, new Set())).toBe(-1);
	});

	it('finds the appended demographics block in the normal case', () => {
		const questions = [
			generated('q1', { rationale: 'measures X' }),
			generated('q2', { rationale: 'measures Y' }),
			qwac(AGE_ID, 'age'),
			qwac(SEX_ID, 'sex')
		];
		expect(detectDemographicsStart(questions, new Set([AGE_ID, SEX_ID]))).toBe(2);
	});

	/** The exact failure mode reported in #47: a generated question happens to
	 *  share a name with a demographic, drops its rationale, and the old
	 *  name-based check pulled it (and everything after) into the
	 *  "automatically added" divider. With id-based detection, only the real
	 *  qwac questions are flagged. */
	it('ignores a generated question that shares a demographic name (#47)', () => {
		const questions = [
			generated('q1', { rationale: 'measures X' }),
			// Model wrote a question about age and called it 'age' — no rationale.
			generated('age'),
			generated('q2', { rationale: 'measures Y' }),
			qwac(AGE_ID, 'age'),
			qwac(SEX_ID, 'sex')
		];
		expect(detectDemographicsStart(questions, new Set([AGE_ID, SEX_ID]))).toBe(3);
	});

	it('ignores a generated question that uses a demographic id but keeps its rationale', () => {
		const questions = [
			{ ...qwac(AGE_ID, 'age'), rationale: 'we already asked this ourselves' },
			generated('q1', { rationale: 'why' })
		];
		// Demographics never carry a rationale; a question that does, even with
		// a matching id, is a generated one and must not be classified.
		expect(detectDemographicsStart(questions, new Set([AGE_ID]))).toBe(-1);
	});

	it('returns -1 when the demographic ids are unknown (e.g. nothing was selected)', () => {
		const questions = [
			generated('q1', { rationale: 'why' }),
			// A demographic-shaped question with a non-qwac id should not be
			// pulled in by mistake.
			{ ...qwac('synthetic_id', 'age'), id: 'synthetic_id' }
		];
		expect(detectDemographicsStart(questions, new Set([AGE_ID]))).toBe(-1);
	});
});
