import { describe, it, expect } from 'vitest';
import { UsageMeter, meteredFetch, readUsage, type StreamProgress } from './usage_meter.js';

describe('readUsage', () => {
	it('reads the usage of a JSON response, cost included', () => {
		const body = JSON.stringify({
			choices: [],
			usage: { prompt_tokens: 100, completion_tokens: 20, cost: 0.0012 }
		});
		expect(readUsage(body)).toEqual({ prompt_tokens: 100, completion_tokens: 20, cost: 0.0012 });
	});

	it('reads the usage from the last chunk of an event stream', () => {
		const body = [
			': OPENROUTER PROCESSING',
			'data: {"choices":[{"delta":{"content":"Hi"}}]}',
			'data: {"choices":[],"usage":{"prompt_tokens":5,"completion_tokens":1,"cost":0.0001}}',
			'data: [DONE]'
		].join('\n');
		expect(readUsage(body)).toEqual({ prompt_tokens: 5, completion_tokens: 1, cost: 0.0001 });
	});

	it('returns undefined when there is no usage', () => {
		expect(readUsage('{"choices":[]}')).toBeUndefined();
		expect(readUsage('not json')).toBeUndefined();
	});
});

describe('UsageMeter', () => {
	it('sums tokens and cost over requests', () => {
		const meter = new UsageMeter();
		meter.record({ prompt_tokens: 100, completion_tokens: 20, cost: 0.001 });
		meter.record({ prompt_tokens: 50, completion_tokens: 10, cost: 0.002 });
		expect(meter.snapshot()).toEqual({
			requests: 2,
			promptTokens: 150,
			completionTokens: 30,
			cost: 0.003
		});
	});

	it('keeps the cost unknown when no response reports one', () => {
		const meter = new UsageMeter();
		meter.record({ prompt_tokens: 100, completion_tokens: 20 });
		expect(meter.snapshot().cost).toBeNull();
	});
});

describe('meteredFetch', () => {
	it('records the usage and hands the caller an unread response', async () => {
		const body = JSON.stringify({ usage: { prompt_tokens: 7, completion_tokens: 3, cost: 0.5 } });
		const seen: number[] = [];
		const meter = new UsageMeter((u) => seen.push(u.promptTokens));
		const fetch = meteredFetch(async () => new Response(body), meter);
		const response = await fetch('https://example.org');
		expect(await response.text()).toBe(body);
		await new Promise((r) => setTimeout(r));
		expect(seen).toEqual([7]);
		expect(meter.snapshot().cost).toBe(0.5);
	});

	it('reports progress of a streamed response and its usage at the end', async () => {
		const events = [
			'data: {"choices":[{"delta":{"reasoning":"abcd"}}]}\n',
			'data: {"choices":[{"delta":{"content":"Hel',
			'lo"}}]}\n',
			'data: {"choices":[],"usage":{"prompt_tokens":5,"completion_tokens":2,"cost":0.1}}\n',
			'data: [DONE]\n'
		];
		const body = new ReadableStream({
			start(c) {
				for (const e of events) c.enqueue(new TextEncoder().encode(e));
				c.close();
			}
		});
		const seen: (StreamProgress | null)[] = [];
		const meter = new UsageMeter(undefined, (p) => seen.push(p));
		const fetch = meteredFetch(
			async () => new Response(body, { headers: { 'content-type': 'text/event-stream' } }),
			meter
		);
		await (await fetch('https://example.org')).text();
		await new Promise((r) => setTimeout(r, 10));
		const last = seen.filter(Boolean).at(-1);
		expect(last).toEqual({ chars: 5, reasoningChars: 4 });
		expect(seen.at(-1)).toBeNull();
		expect(meter.snapshot()).toMatchObject({ requests: 1, promptTokens: 5, cost: 0.1 });
	});
});
