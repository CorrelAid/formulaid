import { describe, it, expect, vi, afterEach } from 'vitest';
import {
	DEMOGRAPHIC_STUDY_ID,
	MAX_BANK_HITS,
	renderBankHits,
	searchQuestionBank
} from './qwacback.js';

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

	it('reports qwac as unavailable, with the cause, when retries run out', async () => {
		const searches = mockQwac([], 503);
		const retries: number[] = [];
		const result = await searchQuestionBank(['Zufriedenheit'], {
			retryDelays: [0, 0],
			onRetry: (n) => retries.push(n)
		});
		expect(result).toEqual({ hits: [], available: false, error: 'HTTP 503' });
		expect(searches).toHaveLength(3);
		expect(retries).toEqual([1, 2]);
	});

	it('retries a rate-limited search and uses the answer that follows', async () => {
		let calls = 0;
		vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
			if (String(input).includes('/collections/studies/records')) {
				return new Response(JSON.stringify(studies));
			}
			calls++;
			return calls === 1
				? new Response('Too Many Requests.', { status: 429 })
				: new Response(JSON.stringify({ items: [hit('sat')] }));
		});
		const result = await searchQuestionBank(['Zufriedenheit'], { retryDelays: [0] });
		expect(result.available).toBe(true);
		expect(result.hits.map((h) => h.id)).toEqual(['sat']);
	});

	it('does not retry a request that cannot pass', async () => {
		const searches = mockQwac([], 400);
		const result = await searchQuestionBank(['Zufriedenheit'], { retryDelays: [0, 0] });
		expect(result.error).toBe('HTTP 400');
		expect(searches).toHaveLength(1);
	});

	it('keeps the hits when only the study titles fail', async () => {
		vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
			if (String(input).includes('/collections/studies/records')) {
				throw new TypeError('Failed to fetch');
			}
			return new Response(JSON.stringify({ items: [hit('sat')] }));
		});
		// A fresh module, so no earlier test's cached titles hide the failure.
		vi.resetModules();
		const fresh = await import('./qwacback.js');
		const result = await fresh.searchQuestionBank(['Zufriedenheit'], { retryDelays: [] });
		expect(result.available).toBe(true);
		expect(result.hits[0]).toMatchObject({ id: 'sat', study: '' });
	});

	it('keeps qwac tags grouped by language, and shows them in the prompt (#59)', async () => {
		mockQwac([
			{
				...hit('trust'),
				concept: 'Interpersonal trust',
				tags: [
					{ lang: 'de', text: 'Vertrauen' },
					{ lang: 'de', text: 'Nachbarn' },
					{ lang: 'de', text: 'Vertrauen' },
					{ lang: 'fr', text: ' ' }
				]
			},
			{ ...hit('sat'), tags: null }
		]);
		const { hits } = await searchQuestionBank(['Vertrauen']);
		expect(hits[0].tags).toEqual({ de: ['Vertrauen', 'Nachbarn'] });
		expect(hits[1].tags).toBeUndefined();
		expect(renderBankHits(hits).split('\n')).toEqual([
			'trust | Ausgewählte CDL Instrumente | Interpersonal trust (de: Vertrauen, Nachbarn) | Frage trust? | single_choice',
			'sat | Ausgewählte CDL Instrumente | Konzept sat | Frage sat? | single_choice'
		]);
	});
});
