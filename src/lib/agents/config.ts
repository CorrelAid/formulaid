import { AxAIOpenAI, AxAIOpenRouter, type AxAIOpenAIModel, type AxAIService } from '@ax-llm/ax';
import { CHAT_MODEL, OPENROUTER_API_URL } from '../constants';

/** How the app shows up in OpenRouter's app rankings and the user's activity log. */
const OPENROUTER_APP_TITLE = 'formulaid';

/** Headers ax adds to every request. OpenRouter's CORS preflight doesn't allow
 *  them, so a browser call with them is blocked (#31); custom endpoints are
 *  likely to reject them too. Nothing on the provider side needs them. */
const NON_CORS_HEADERS = ['X-Request-ID', 'X-Retry-Count'];

const corsSafeFetch: typeof fetch = (input, init) => {
	const headers = new Headers(init?.headers);
	for (const h of NON_CORS_HEADERS) headers.delete(h);
	return fetch(input, { ...init, headers });
};

/**
 * Build the OpenAI-compatible client.
 *
 * `baseUrl` is an absolute URL, called directly from the browser: OpenRouter,
 * or an endpoint the user supplies.
 */
export function createModel(
	apiKey: string,
	model: string = CHAT_MODEL,
	baseUrl: string = OPENROUTER_API_URL
): AxAIService {
	const origin = typeof window !== 'undefined' ? window.location.origin : undefined;

	if (baseUrl === OPENROUTER_API_URL) {
		return new AxAIOpenRouter({
			apiKey,
			config: { model },
			options: { debug: false, fetch: corsSafeFetch },
			referer: origin,
			title: OPENROUTER_APP_TITLE
		}) as AxAIService;
	}

	const apiURL = /^https?:\/\//i.test(baseUrl)
		? baseUrl
		: `${origin ?? 'http://localhost'}${baseUrl}`;
	return new AxAIOpenAI({
		apiKey,
		apiURL,
		config: {
			// Gateway model ids (e.g. mistral-medium-3.1) are not in ax's list of
			// OpenAI model names, but the endpoint accepts them.
			model: model as AxAIOpenAIModel
		},
		options: {
			debug: false,
			fetch: corsSafeFetch
		}
	}) as AxAIService;
}
