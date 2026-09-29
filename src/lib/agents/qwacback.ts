const QWAC_API = 'https://qwacback.correlaid.org/api';

/** The demographic standards are offered through the demographics checkboxes,
 *  so the generator never sees them as candidates. */
export const DEMOGRAPHIC_STUDY_ID = '2z4e5jfgc6s6mwy';

/** How many hits reach the generator prompt, however large the bank grows. */
export const MAX_BANK_HITS = 30;

/** Waits before each retry of a failed qwac request. qwac restarts and
 *  re-seeds on every deploy, and limits guests to 60 requests per 10 s; both
 *  pass within this. */
export const RETRY_DELAYS_MS = [2000, 5000, 10000];

/** The bank changes over time; a page left open picks up edits after this. */
const CACHE_MS = 10 * 60 * 1000;

export interface BankQuestion {
	id: string;
	study: string;
	concept: string;
	question: string;
	answerType: string;
	/** The concept in other languages, e.g. `{ de: ['Vertrauen', 'Nachbarn'] }`
	 *  for an English item (qwac tags, #59). */
	tags?: Record<string, string[]>;
}

export interface BankSearch {
	hits: BankQuestion[];
	/** False when qwac could not be reached. Generation still runs, but every
	 *  question is then written by the model (#19). */
	available: boolean;
	/** Why qwac could not be reached, e.g. "HTTP 429"; only when unavailable. */
	error?: string;
}

export interface SearchOptions {
	signal?: AbortSignal;
	/** Called before each retry, with its number (1-based). */
	onRetry?: (attempt: number) => void;
	retryDelays?: number[];
}

/** A failed qwac request; `retry` for failures that may pass (rate limit,
 *  server error, network), not for ones that won't (404, bad query). */
class QwacError extends Error {
	constructor(
		message: string,
		readonly retry: boolean
	) {
		super(message);
	}
}

interface RawQuestion {
	id: string;
	study_id: string;
	concept?: string;
	question_text?: string;
	answer_type?: string;
	tags?: { lang?: string; text?: string }[] | null;
}

/** qwac's `[{lang, text}]` tags grouped by language; empty ones dropped. */
function groupTags(tags: RawQuestion['tags']): Record<string, string[]> | undefined {
	const grouped: Record<string, string[]> = {};
	for (const t of tags ?? []) {
		const text = t.text?.trim();
		if (!text) continue;
		const texts = (grouped[t.lang?.trim() || '?'] ??= []);
		if (!texts.includes(text)) texts.push(text);
	}
	return Object.keys(grouped).length ? grouped : undefined;
}

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
	let res: Response;
	try {
		res = await fetch(`${QWAC_API}${path}`, { signal });
	} catch (e) {
		if (signal?.aborted) throw e;
		throw new QwacError(`network error (${(e as Error).message})`, true);
	}
	if (!res.ok) throw new QwacError(`HTTP ${res.status}`, res.status === 429 || res.status >= 500);
	return res.json() as Promise<T>;
}

/** `get`, retried after each of `delays` while the failure may pass. */
async function getWithRetry<T>(path: string, options: SearchOptions): Promise<T> {
	const { signal, onRetry, retryDelays = RETRY_DELAYS_MS } = options;
	for (let attempt = 0; ; attempt++) {
		try {
			return await get<T>(path, signal);
		} catch (e) {
			if (!(e instanceof QwacError) || !e.retry || attempt >= retryDelays.length) throw e;
			onRetry?.(attempt + 1);
			await wait(retryDelays[attempt], signal);
		}
	}
}

function wait(ms: number, signal?: AbortSignal): Promise<void> {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) return reject(signal.reason);
		const id = setTimeout(done, ms);
		function done() {
			signal?.removeEventListener('abort', abort);
			resolve();
		}
		function abort() {
			clearTimeout(id);
			reject(signal?.reason);
		}
		signal?.addEventListener('abort', abort, { once: true });
	});
}

/** Study titles for the prompt; a handful of records, cached for a while. */
let studies: { at: number; titles: Promise<Map<string, string>> } | null = null;

function studyTitles(signal?: AbortSignal): Promise<Map<string, string>> {
	if (!studies || Date.now() - studies.at > CACHE_MS) {
		const titles = get<{ items: { id: string; title: string }[] }>(
			'/collections/studies/records?perPage=200&fields=id,title',
			signal
		).then((r) => new Map(r.items.map((s) => [s.id, s.title])));
		// Not cached on failure: the next generation tries again.
		titles.catch(() => {
			studies = null;
		});
		studies = { at: Date.now(), titles };
	}
	return studies.titles;
}

/**
 * The bank questions that match any of `keywords`, best first (#33). The model
 * proposes the keywords; qwac's search does the rest (#57): several terms
 * OR-matched and ranked by how many match, umlauts folded, German and English
 * stemming, compounds, and the demographic standards left out.
 */
export async function searchQuestionBank(
	keywords: string[],
	options: SearchOptions = {}
): Promise<BankSearch> {
	const { signal } = options;
	const terms = [...new Set(keywords.map((k) => k.trim()).filter((k) => k.length >= 3))];
	if (terms.length === 0) return { hits: [], available: true };
	const query = new URLSearchParams({
		q: terms.join(' '),
		exclude_study: DEMOGRAPHIC_STUDY_ID,
		perPage: String(MAX_BANK_HITS)
	});
	try {
		const [result, titles] = await Promise.all([
			getWithRetry<{ items: RawQuestion[] | null }>(`/search/questions?${query}`, options),
			// Study names only label the hits; without them the hits still help.
			studyTitles(signal).catch(() => new Map<string, string>())
		]);
		const hits = (result.items ?? [])
			// Belt and braces: the filter is the server's, the rule is ours.
			.filter((q) => q.study_id !== DEMOGRAPHIC_STUDY_ID)
			.slice(0, MAX_BANK_HITS)
			.map((q) => ({
				id: q.id,
				study: titles.get(q.study_id) ?? '',
				concept: q.concept ?? '',
				question: q.question_text ?? '',
				answerType: q.answer_type ?? '',
				tags: groupTags(q.tags)
			}));
		return { hits, available: true };
	} catch (e) {
		if (signal?.aborted) throw e;
		const error = (e as Error).message;
		console.warn('qwac question bank unavailable, skipping:', error);
		return { hits: [], available: false, error };
	}
}

/** One line per hit, the format the generator prompt describes. */
export function renderBankHits(hits: BankQuestion[]): string {
	return hits
		.map((q) => `${q.id} | ${q.study} | ${withTags(q)} | ${q.question} | ${q.answerType}`)
		.join('\n');
}

/** The concept plus its other-language tags, so the generator sees why an
 *  English item matched a German goal: `Interpersonal trust (de: Vertrauen)`. */
function withTags(q: BankQuestion): string {
	const tags = Object.entries(q.tags ?? {}).map(([lang, texts]) => `${lang}: ${texts.join(', ')}`);
	return tags.length ? `${q.concept} (${tags.join('; ')})` : q.concept;
}
