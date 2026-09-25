const QWAC_API = 'https://qwacback.correlaid.org/api';

/** The demographic standards are offered through the demographics checkboxes,
 *  so the generator never sees them as candidates. */
export const DEMOGRAPHIC_STUDY_ID = '2z4e5jfgc6s6mwy';

/** How many hits reach the generator prompt, however large the bank grows. */
export const MAX_BANK_HITS = 30;

/** The bank changes over time; a page left open picks up edits after this. */
const CACHE_MS = 10 * 60 * 1000;

export interface BankQuestion {
	id: string;
	study: string;
	concept: string;
	question: string;
	answerType: string;
}

export interface BankSearch {
	hits: BankQuestion[];
	/** False when qwac could not be reached. Generation still runs, but every
	 *  question is then written by the model (#19). */
	available: boolean;
}

interface RawQuestion {
	id: string;
	study_id: string;
	name?: string;
	concept?: string;
	question_text?: string;
	answer_type?: string;
}

/** A bank question plus the folded text it is searched by. */
interface Indexed {
	question: BankQuestion;
	text: string;
}

async function fetchBank(signal?: AbortSignal): Promise<Indexed[]> {
	const get = async <T>(path: string): Promise<T> => {
		const res = await fetch(`${QWAC_API}${path}`, { signal });
		if (!res.ok) throw new Error(`qwac ${path}: HTTP ${res.status}`);
		return res.json() as Promise<T>;
	};
	const [studies, questions] = await Promise.all([
		get<{ items: { id: string; title: string }[] }>(
			'/collections/studies/records?perPage=200&fields=id,title'
		),
		get<RawQuestion[]>('/questions')
	]);
	const titles = new Map(studies.items.map((s) => [s.id, s.title]));
	return questions
		.filter((q) => q.study_id !== DEMOGRAPHIC_STUDY_ID)
		.map((q) => ({
			question: {
				id: q.id,
				study: titles.get(q.study_id) ?? '',
				concept: q.concept ?? '',
				question: q.question_text ?? '',
				answerType: q.answer_type ?? ''
			},
			// Variable names often carry the construct too ("weiterempfehlung").
			text: fold(`${q.concept ?? ''} ${q.question_text ?? ''} ${q.name ?? ''}`)
		}));
}

let cached: { at: number; bank: Promise<Indexed[]> } | null = null;

async function getBank(signal?: AbortSignal): Promise<Indexed[]> {
	if (!cached || Date.now() - cached.at > CACHE_MS) {
		cached = { at: Date.now(), bank: fetchBank(signal) };
	}
	try {
		return await cached.bank;
	} catch (e) {
		// Not cached: the next generation tries again.
		cached = null;
		throw e;
	}
}

/** Lowercase, umlauts spelled out, other accents dropped: "Qualität",
 *  "qualitaet" and "Qualitat" all match. */
function fold(text: string): string {
	return text
		.toLowerCase()
		.replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c] ?? c)
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '');
}

/** A crude stem, so a noun finds its verb and adjective forms:
 *  "Zufriedenheit" → "zufriede" matches "zufrieden",
 *  "Weiterempfehlung" → "weiterempfe" matches "weiterempfehlen". */
function stem(keyword: string): string {
	const k = fold(keyword.trim());
	return k.length > 8 ? k.slice(0, Math.max(6, k.length - 5)) : k;
}

/**
 * The bank questions that match any of `keywords`, best first (#33). The model
 * proposes the keywords, but the search runs here: in test runs one model
 * never called the search tool and another searched with phrases that a
 * substring search can't match.
 */
export async function searchQuestionBank(
	keywords: string[],
	signal?: AbortSignal
): Promise<BankSearch> {
	let bank: Indexed[];
	try {
		bank = await getBank(signal);
	} catch (e) {
		if (signal?.aborted) throw e;
		console.warn('qwac question bank unavailable, skipping:', (e as Error).message);
		return { hits: [], available: false };
	}
	const stems = [...new Set(keywords.map(stem).filter((s) => s.length >= 3))];
	const scored = bank
		.map(({ question, text }) => ({
			question,
			score: stems.filter((s) => text.includes(s)).length
		}))
		.filter((s) => s.score > 0)
		.sort((a, b) => b.score - a.score);
	return { hits: scored.slice(0, MAX_BANK_HITS).map((s) => s.question), available: true };
}

/** One line per hit, the format the generator prompt describes. */
export function renderBankHits(hits: BankQuestion[]): string {
	return hits
		.map((q) => `${q.id} | ${q.study} | ${q.concept} | ${q.question} | ${q.answerType}`)
		.join('\n');
}
