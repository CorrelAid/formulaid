import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { EMBEDDING_MODEL } from '../src/lib/constants.js';

// Load API key from .env (assuming it might be a raw key or KEY=VALUE)
let API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
    try {
        const envContent = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf-8').trim();
        if (envContent.includes('=')) {
            const lines = envContent.split('\n');
            for (const line of lines) {
                if (line.startsWith('OPENROUTER_API_KEY=')) {
                    API_KEY = line.split('=')[1].trim();
                }
            }
        } else if (envContent.length > 20) {
            // Assume the whole file is the key if no '=' is found
            API_KEY = envContent;
        }
    } catch (e) {
        console.warn('Could not load .env file. Proceeding with environment variables.');
    }
}

if (!API_KEY) {
  console.error("OPENROUTER_API_KEY is not set. Please add it to .env or environment.");
  process.exit(1);
}

async function generate() {
  console.log("Reading static/processed.csv...");
  const buf = fs.readFileSync('static/processed.csv');
  const wb = XLSX.read(buf, { type: 'buffer' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  console.log(`Found ${data.length} questions.`);

  const embeddings = [];
  const batchSize = 100;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const texts = batch.map(row => row.question_text || "");
    const ids = batch.map(row => row.question_id);

    console.log(`Processing batch ${i / batchSize + 1} / ${Math.ceil(data.length / batchSize)}...`);
    // console.log("Batch texts sample:", texts.slice(0, 2));

    try {
      const body = JSON.stringify({
        model: EMBEDDING_MODEL,
        input: texts
      });
      const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Failing body sample:", body.substring(0, 500));
        throw new Error(`OpenRouter API error: ${response.status} ${error}`);
      }

      const resJson = await response.json();
      if (!resJson.data) {
        throw new Error(`Unexpected response format: ${JSON.stringify(resJson)}`);
      }

      resJson.data.forEach((item, index) => {
        embeddings.push({
          question_id: ids[index],
          embedding: item.embedding
        });
      });
    } catch (err) {
      console.error(`Error processing batch at index ${i}:`, err);
      // Continue with next batch or exit? Let's exit for safety.
      process.exit(1);
    }
  }

  console.log(`Saving ${embeddings.length} embeddings to static/embeddings.json...`);
  fs.writeFileSync('static/embeddings.json', JSON.stringify(embeddings));
  console.log("Done!");
}

generate();
