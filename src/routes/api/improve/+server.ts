import { QuestionImproverAgent, createModel } from '$lib/agents/index.js';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { apiKey, model: modelName, label, type, choices, context } = await request.json();

	if (!apiKey) {
		return new Response(JSON.stringify({ error: 'API key not provided' }), { 
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const ai = createModel(apiKey, modelName || 'google/gemini-2.0-flash-001');
		const agent = new QuestionImproverAgent();

		const result = await agent.improveQuestion(ai, label, type, choices, context);
		const traces = agent.getTraces();

		return new Response(JSON.stringify({ ...result, traces }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (e) {
		console.error('Error in question improvement:', e);
		return new Response(JSON.stringify({ error: (e as Error).message }), { 
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
