import { AxMCPClient, type AxFunction } from '@ax-llm/ax';

const QWACBACK_MCP_URL = 'https://qwacback.correlaid.org/mcp';

/** Simple stateful HTTP transport — no SSE stream, just POST with session ID. */
class SimpleHTTPTransport {
	private sessionId: string | null = null;

	async send(message: Readonly<{ [key: string]: unknown }>) {
		const headers: Record<string, string> = { 'Content-Type': 'application/json' };
		if (this.sessionId) headers['Mcp-Session-Id'] = this.sessionId;

		const res = await fetch(QWACBACK_MCP_URL, {
			method: 'POST',
			headers,
			body: JSON.stringify(message)
		});

		const sid = res.headers.get('Mcp-Session-Id');
		if (sid) this.sessionId = sid;

		if (!res.ok) throw new Error(`MCP HTTP ${res.status}: ${res.statusText}`);
		return res.json();
	}

	async sendNotification(message: Readonly<{ [key: string]: unknown }>) {
		const headers: Record<string, string> = { 'Content-Type': 'application/json' };
		if (this.sessionId) headers['Mcp-Session-Id'] = this.sessionId;
		await fetch(QWACBACK_MCP_URL, { method: 'POST', headers, body: JSON.stringify(message) });
	}
}

let initPromise: Promise<AxFunction[]> | null = null;

async function initClient(): Promise<AxFunction[]> {
	const client = new AxMCPClient(new SimpleHTTPTransport());
	await client.init();
	return client.toFunction();
}

export async function getQwacbackFunctions(): Promise<AxFunction[]> {
	if (!initPromise) {
		initPromise = initClient().catch((e) => {
			console.warn('qwacback MCP unavailable, skipping:', e.message);
			initPromise = null;
			return [];
		});
	}
	return initPromise;
}
