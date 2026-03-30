import { LeadAgent, createModel, XLSFormGenerator } from '$lib/agents/index.js';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { apiKey, model: modelName, ...input } = await request.json();

	const isFreeModel = (modelName as string)?.endsWith(':free');
	if (!apiKey && !isFreeModel) {
		return new Response(JSON.stringify({ error: 'API key not provided' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	let closed = false;
	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder();

			const send = (data: any) => {
				if (closed) return;
				try {
					controller.enqueue(encoder.encode(JSON.stringify(data) + '\n'));
				} catch {
					closed = true;
				}
			};

			const close = () => {
				if (closed) return;
				closed = true;
				try {
					controller.close();
				} catch (e) {
					// Ignore if already closed
				}
			};

			try {
				const ai = createModel(apiKey, modelName || 'google/gemini-2.0-flash-001');
				const leadAgent = new LeadAgent(ai);

				const survey = await leadAgent.buildSurvey(input as any, 
					(status) => {
						send({ type: 'status', message: status });
					},
					(trace) => {
						send({ type: 'trace', trace });
					}
				);

				const generator = new XLSFormGenerator();
				const excelBuffer = generator.generate(survey);
				const base64Excel = Buffer.from(excelBuffer).toString('base64');

				send({ type: 'result', survey, file: base64Excel });
				close();
			} catch (e) {
				console.error('Error in AI generation:', e);
				send({ type: 'error', message: (e as Error).message });
				close();
			}
		},
		cancel() {
			closed = true;
		}
	});

	return new Response(stream, {
		headers: { 
			'Content-Type': 'application/x-ndjson',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		}
	});
};
