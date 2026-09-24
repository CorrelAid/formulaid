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

export interface QwacbackTools {
	functions: AxFunction[];
	/** False when the MCP server could not be reached. Generation still runs,
	 *  but every question is then written by the model (#19). */
	available: boolean;
}

let initPromise: Promise<QwacbackTools> | null = null;

async function initClient(): Promise<QwacbackTools> {
	const client = new AxMCPClient(new SimpleHTTPTransport());
	await client.init();
	return { functions: client.toFunction(), available: true };
}

export async function getQwacbackFunctions(): Promise<QwacbackTools> {
	if (!initPromise) {
		initPromise = initClient().catch((e) => {
			console.warn('qwacback MCP unavailable, skipping:', e.message);
			// Not cached: the next generation tries again.
			initPromise = null;
			return { functions: [], available: false };
		});
	}
	return initPromise;
}
