/** Tokens and cost of one generation, summed over every model request it made
 *  (keyword step, generation, repairs and ax's retries). */
export interface RunUsage {
	requests: number;
	promptTokens: number;
	completionTokens: number;
	/** In USD, as OpenRouter reports it. null when no response carried a cost,
	 *  e.g. a custom endpoint. */
	cost: number | null;
}

interface RawUsage {
	prompt_tokens?: number;
	completion_tokens?: number;
	cost?: number;
}

export const EMPTY_USAGE: RunUsage = {
	requests: 0,
	promptTokens: 0,
	completionTokens: 0,
	cost: null
};

/** Sums the `usage` block of every response. ax keeps the token counts but
 *  drops OpenRouter's `cost`, so this reads the raw responses instead. */
export class UsageMeter {
	private usage: RunUsage = { ...EMPTY_USAGE };

	constructor(private onChange?: (usage: RunUsage) => void) {}

	record(raw: RawUsage) {
		const cost = typeof raw.cost === 'number' ? raw.cost : null;
		this.usage = {
			requests: this.usage.requests + 1,
			promptTokens: this.usage.promptTokens + (raw.prompt_tokens ?? 0),
			completionTokens: this.usage.completionTokens + (raw.completion_tokens ?? 0),
			cost: cost === null ? this.usage.cost : (this.usage.cost ?? 0) + cost
		};
		this.onChange?.(this.snapshot());
	}

	snapshot(): RunUsage {
		return { ...this.usage };
	}
}

/** The `usage` block of a chat completion body: plain JSON, or a server-sent
 *  event stream where the last chunk carries it. */
export function readUsage(body: string): RawUsage | undefined {
	const trimmed = body.trimStart();
	if (trimmed.startsWith('{')) {
		try {
			return usageOf(JSON.parse(trimmed));
		} catch {
			return undefined;
		}
	}
	let found: RawUsage | undefined;
	for (const line of body.split('\n')) {
		if (!line.startsWith('data:')) continue;
		const data = line.slice(5).trim();
		if (!data || data === '[DONE]') continue;
		try {
			found = usageOf(JSON.parse(data)) ?? found;
		} catch {
			// A keep-alive or partial line; the usage chunk is complete JSON.
		}
	}
	return found;
}

function usageOf(json: unknown): RawUsage | undefined {
	if (!json || typeof json !== 'object') return undefined;
	const usage = (json as { usage?: unknown }).usage;
	return usage && typeof usage === 'object' ? (usage as RawUsage) : undefined;
}

/** Wraps `fetch` so every successful response is read (from a clone, in the
 *  background) and its usage recorded. The caller gets the response as is. */
export function meteredFetch(inner: typeof fetch, meter: UsageMeter): typeof fetch {
	return async (input, init) => {
		const response = await inner(input, init);
		if (response.ok) {
			response
				.clone()
				.text()
				.then((body) => {
					const usage = readUsage(body);
					if (usage) meter.record(usage);
				})
				// Cancelled runs abort the body; nothing to record then.
				.catch(() => {});
		}
		return response;
	};
}
