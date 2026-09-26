import { describe, it, expect, vi, afterEach } from 'vitest';
import { DEMOGRAPHIC_STUDY_ID, MAX_BANK_HITS, searchQuestionBank } from './qwacback.js';

const studies = { items: [{ id: 'cdl', title: 'Ausgewählte CDL Instrumente' }] };
const hit = (id: string, study_id = 'cdl') => ({
	id,
	study_id,
	concept: `Konzept ${id}`,
	question_text: `Frage ${id}?`,
	answer_type: 'single_choice'
});

/** Answers qwac's two endpoints and records the search URLs. */
function mockQwac(items: unknown[] | null, status = 200) {
	const searches: URL[] = [];
	vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
		const url = new URL(String(input));
		if (url.pathname.endsWith('/collections/studies/records')) {
			return new Response(JSON.stringify(studies), { status: 200 });
		}
		searches.push(url);
		return new Response(JSON.stringify({ items, totalItems: items?.length ?? 0 }), { status });
	});
	return searches;
}

afterEach(() => vi.restoreAllMocks());

describe('searchQuestionBank (#57)', () => {
	it("asks qwac's search once, for all keywords, without the demographic standards", async () => {
		const searches = mockQwac([hit('nps'), hit('sat')]);
		const { hits, available } = await searchQuestionBank([
			'Zufriedenheit',
			'Weiterempfehlung',
			'Zufriedenheit',
			'ab'
		]);
		expect(available).toBe(true);
		expect(searches).toHaveLength(1);
		const params = searches[0].searchParams;
		expect(params.get('q')).toBe('Zufriedenheit Weiterempfehlung');
		expect(params.get('exclude_study')).toBe(DEMOGRAPHIC_STUDY_ID);
		expect(params.get('perPage')).toBe(String(MAX_BANK_HITS));
		expect(hits.map((h) => h.id)).toEqual(['nps', 'sat']);
		expect(hits[0]).toMatchObject({ study: 'Ausgewählte CDL Instrumente', question: 'Frage nps?' });
	});

	it('drops a demographic standard even if the server returns one', async () => {
		mockQwac([hit('demo', DEMOGRAPHIC_STUDY_ID), hit('sat')]);
		expect((await searchQuestionBank(['Geschlecht'])).hits.map((h) => h.id)).toEqual(['sat']);
	});

	it('treats no hits (items: null) as an empty result', async () => {
		mockQwac(null);
		expect(await searchQuestionBank(['Mobilität'])).toEqual({ hits: [], available: true });
	});

	it('reports qwac as unavailable when the search fails', async () => {
		mockQwac([], 503);
		expect(await searchQuestionBank(['Zufriedenheit'])).toEqual({ hits: [], available: false });
	});
});
