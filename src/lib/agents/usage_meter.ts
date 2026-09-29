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

/** How far the response to the request in flight has come, counted from the
 *  streamed deltas. Lets the page show that a long step is still moving. */
export interface StreamProgress {
	/** Characters of the answer written so far. */
	chars: number;
	/** Characters of reasoning tokens so far, for models that stream them. */
	reasoningChars: number;
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

	constructor(
		private onChange?: (usage: RunUsage) => void,
		/** Called as a streamed response arrives, and with null when it ends. */
		private onStream?: (progress: StreamProgress | null) => void
	) {}

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

	stream(progress: StreamProgress | null) {
		this.onStream?.(progress);
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
	for (const line of body.split('\n')) found = usageOf(parseEvent(line)) ?? found;
	return found;
}

/** The JSON of one `data:` line of an event stream; undefined for comments,
 *  keep-alives, `[DONE]` and anything that isn't complete JSON. */
function parseEvent(line: string): unknown {
	if (!line.startsWith('data:')) return undefined;
	const data = line.slice(5).trim();
	if (!data || data === '[DONE]') return undefined;
	try {
		return JSON.parse(data);
	} catch {
		return undefined;
	}
}

/** Answer and reasoning text of one streamed chunk. OpenRouter sends reasoning
 *  as `reasoning`, some OpenAI-compatible endpoints as `reasoning_content`. */
function deltaOf(json: unknown): { content: string; reasoning: string } {
	const delta = (json as { choices?: { delta?: Record<string, unknown> }[] } | undefined)
		?.choices?.[0]?.delta;
	const text = (v: unknown) => (typeof v === 'string' ? v : '');
	return {
		content: text(delta?.content),
		reasoning: text(delta?.reasoning) || text(delta?.reasoning_content)
	};
}

function usageOf(json: unknown): RawUsage | undefined {
	if (!json || typeof json !== 'object') return undefined;
	const usage = (json as { usage?: unknown }).usage;
	return usage && typeof usage === 'object' ? (usage as RawUsage) : undefined;
}

/** Wraps `fetch` so every successful response is read (from a clone, in the
 *  background) and its usage recorded; streamed responses also report their
 *  progress as they arrive. The caller gets the response as is. */
export function meteredFetch(inner: typeof fetch, meter: UsageMeter): typeof fetch {
	return async (input, init) => {
		const response = await inner(input, init);
		if (response.ok) {
			const streamed = response.headers.get('content-type')?.includes('text/event-stream');
			(streamed ? follow(response.clone(), meter) : read(response.clone(), meter))
				// Cancelled runs abort the body; nothing to record then.
				.catch(() => {})
				.finally(() => streamed && meter.stream(null));
		}
		return response;
	};
}

async function read(response: Response, meter: UsageMeter) {
	const usage = readUsage(await response.text());
	if (usage) meter.record(usage);
}

async function follow(response: Response, meter: UsageMeter) {
	if (!response.body) return;
	const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
	const progress: StreamProgress = { chars: 0, reasoningChars: 0 };
	let usage: RawUsage | undefined;
	let pending = '';
	meter.stream({ ...progress });
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		const lines = (pending + value).split('\n');
		// The last piece may be a line cut off mid-chunk; finish it next time.
		pending = lines.pop() ?? '';
		for (const line of lines) {
			const json = parseEvent(line);
			const { content, reasoning } = deltaOf(json);
			progress.chars += content.length;
			progress.reasoningChars += reasoning.length;
			usage = usageOf(json) ?? usage;
		}
		meter.stream({ ...progress });
	}
	usage = usageOf(parseEvent(pending)) ?? usage;
	if (usage) meter.record(usage);
}
