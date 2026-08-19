import { AxAIOpenAI, type AxAIService } from '@ax-llm/ax';
import { CHAT_MODEL } from '../constants';

/**
 * Build the OpenAI-compatible client.
 *
 * `baseUrl` is either a same-origin path served by the app's proxy
 * (`/api/v1` → OpenRouter, `/api/eurouter/v1` → EUrouter) or an absolute URL of
 * a user-supplied endpoint, which is then called directly from the browser.
 */
export function createModel(
	apiKey: string,
	model: string = CHAT_MODEL,
	baseUrl: string = '/api/v1'
): AxAIService<any, any, any> {
	const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
	const apiURL = /^https?:\/\//i.test(baseUrl) ? baseUrl : `${origin}${baseUrl}`;
	return new AxAIOpenAI({
		apiKey,
		apiURL,
		config: {
			model
		},
		options: {
			debug: false
		}
	} as any) as unknown as AxAIService<any, any, any>;
}
