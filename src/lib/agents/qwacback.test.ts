import { describe, it, expect, vi, afterEach } from 'vitest';
import { DEMOGRAPHIC_STUDY_ID, searchQuestionBank } from './qwacback.js';

const studies = {
	items: [
		{ id: 'cdl', title: 'Ausgewählte CDL Instrumente' },
		{ id: DEMOGRAPHIC_STUDY_ID, title: 'Demographische Standards' }
	]
};
const questions = [
	{
		id: 'nps',
		study_id: 'cdl',
		name: 'weiterempfehlung',
		concept: 'Net Promoter Score',
		question_text: 'Wie wahrscheinlich ist es, dass Sie <ETWAS> weiterempfehlen werden?',
		answer_type: 'single_choice'
	},
	{
		id: 'sat',
		study_id: 'cdl',
		concept: 'Zufriedenheit mit dem Angebot',
		question_text: 'Wie zufrieden sind Sie mit dem Angebot?',
		answer_type: 'single_choice'
	},
	{
		id: 'demo',
		study_id: DEMOGRAPHIC_STUDY_ID,
		concept: 'Zufriedenheit mit dem Einkommen',
		question_text: 'Wie zufrieden sind Sie mit Ihrem Einkommen?',
		answer_type: 'single_choice'
	}
];

function mockQwac() {
	return vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
		const body = String(url).includes('/collections/studies') ? studies : questions;
		return new Response(JSON.stringify(body), { status: 200 });
	});
}

afterEach(() => vi.restoreAllMocks());

describe('searchQuestionBank (#33)', () => {
	it('finds verb forms from a noun keyword, and never demographic standards', async () => {
		mockQwac();
		const { hits, available } = await searchQuestionBank(['Zufriedenheit', 'Weiterempfehlung']);
		expect(available).toBe(true);
		expect(hits.map((h) => h.id).sort()).toEqual(['nps', 'sat']);
		expect(hits[0].study).toBe('Ausgewählte CDL Instrumente');
	});

	it('returns nothing for keywords that match no question', async () => {
		mockQwac();
		expect((await searchQuestionBank(['Mobilität'])).hits).toEqual([]);
	});
});
