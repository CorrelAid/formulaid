import { AxAIOpenRouter, type AxAIService } from '@ax-llm/ax';
import { CHAT_MODEL } from '../constants';

export function createModel(apiKey: string, model: string = CHAT_MODEL): AxAIService<any, any, any> {
	return new AxAIOpenRouter({
		apiKey,
		config: {
			model
		},
		options: {
			debug: true
		}
	}) as unknown as AxAIService<any, any, any>;
}
