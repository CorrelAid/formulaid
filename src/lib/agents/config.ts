import { AxAIOpenRouter, type AxAIService } from '@ax-llm/ax';
import { CHAT_MODEL } from '../constants';

export function createModel(apiKey: string, model: string = CHAT_MODEL): AxAIService<any, any, any> {
	// In browser, use the proxy to avoid CORS issues
	const apiURL = typeof window !== 'undefined' ? '/api/v1' : undefined;
	return new AxAIOpenRouter({
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
