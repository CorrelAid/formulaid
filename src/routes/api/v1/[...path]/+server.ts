import type { RequestHandler } from './$types';

const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';

async function proxy(request: Request, path: string): Promise<Response> {
	const url = new URL(request.url);
	const targetUrl = `${OPENROUTER_BASE}/${path}${url.search}`;

	const headers = new Headers(request.headers);
	headers.set('Host', 'openrouter.ai');
	headers.delete('accept-encoding');

	const response = await fetch(targetUrl, {
		method: request.method,
		headers,
		body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined
	});

	const responseHeaders = new Headers(response.headers);
	responseHeaders.delete('content-encoding');
	responseHeaders.delete('transfer-encoding');
	responseHeaders.delete('content-length');

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders
	});
}

export const GET: RequestHandler = ({ request, params }) => proxy(request, params.path);
export const POST: RequestHandler = ({ request, params }) => proxy(request, params.path);
