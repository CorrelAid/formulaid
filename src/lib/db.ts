import * as duckdb from '@duckdb/duckdb-wasm';
import { EMBEDDING_MODEL } from './constants';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_wasm_next from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
	mvp: {
		mainModule: duckdb_wasm,
		mainWorker: mvp_worker
	},
	eh: {
		mainModule: duckdb_wasm_next,
		mainWorker: eh_worker
	}
};

let db: duckdb.AsyncDuckDB | null = null;
let conn: duckdb.AsyncDuckDBConnection | null = null;

export async function initDB() {
	if (conn) return conn;

	const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
	const worker = new Worker(bundle.mainWorker!);
	const logger = new duckdb.ConsoleLogger();
	db = new duckdb.AsyncDuckDB(logger, worker);
	await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
	conn = await db.connect();

	try {
		await conn.query(`INSTALL json;`);
		await conn.query(`LOAD json;`);
	} catch (e) {
		console.warn("Could not load JSON extension:", e);
	}

	const csvUrl = '/processed.csv';
	const embeddingsUrl = '/embeddings.json';
	await db.registerFileURL('processed.csv', csvUrl, duckdb.DuckDBDataProtocol.HTTP, false);
	await db.registerFileURL('embeddings.json', embeddingsUrl, duckdb.DuckDBDataProtocol.HTTP, false);
	
	await conn.query(`
		CREATE TABLE questions AS 
		SELECT * 
		FROM read_csv_auto('processed.csv', types={'question_id': 'VARCHAR'})
	`);

	await conn.query(`
		CREATE TABLE embeddings AS
		SELECT trim(question_id, '"')::VARCHAR as question_id, embedding::FLOAT[] as embedding
		FROM read_json_auto('embeddings.json')
	`);

	return conn;
}

async function getEmbedding(text: string, apiKey: string) {
	const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: EMBEDDING_MODEL,
			input: text
		})
	});
	if (!response.ok) {
		const err = await response.text();
		throw new Error(`Embedding failed: ${err}`);
	}
	const json = await response.json();
	return json.data[0].embedding;
}

export async function getDemographicQuestions(conn: duckdb.AsyncDuckDBConnection, selectedDemographics: string[]) {
	if (selectedDemographics.length === 0) return [];
	const demoQuery = `
		SELECT *
		FROM questions
		WHERE question_name IN (${selectedDemographics.map((d) => `'${d}'`).join(',')})
		AND study = 'Demographische Standards 2024'
	`;
	const demoResult = await conn.query(demoQuery);
	return demoResult.toArray().map((row) => row.toJSON());
}

export async function searchQuestions(conn: duckdb.AsyncDuckDBConnection, researchQuestion: string, apiKey?: string) {
	let results: any[] = [];
	const sanitizedQuery = researchQuestion.replace(/'/g, "''").trim();
	if (!sanitizedQuery) return [];

	// Use pure Semantic Search (Vector Search)
	if (apiKey) {
		try {
			const queryVector = await getEmbedding(sanitizedQuery, apiKey);
			const vectorStr = `[${queryVector.join(',')}]`;

			const searchResults = await conn.query(`
				SELECT q.*, list_cosine_similarity(e.embedding, ${vectorStr}::FLOAT[]) AS combined_score
				FROM questions q
				JOIN embeddings e ON q.question_id = e.question_id
				WHERE e.embedding IS NOT NULL
				ORDER BY combined_score DESC
				LIMIT 10
			`);
			results = searchResults.toArray().map((row) => row.toJSON());
		} catch (e) {
			console.error("Semantic search failed:", e);
		}
	}
	
	return results;
}
