import { AxAIOpenAI, type AxAIService } from '@ax-llm/ax';
import { CHAT_MODEL } from '../constants';

export function createModel(apiKey: string, model: string = CHAT_MODEL): AxAIService<any, any, any> {
	return new AxAIOpenAI({
		apiKey,
		apiURL: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost'}/api/v1`,
		config: {
			model
		},
		options: {
			debug: false
		}
	} as any) as unknown as AxAIService<any, any, any>;
}
