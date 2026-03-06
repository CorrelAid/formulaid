/**
 * Agent Initialization and Optimization Script
 * 
 * This script initializes the agents with optimized instructions and few-shot examples.
 * It generates a folder structure for each skill following the agentskills.io specification.
 * 
 * QUICK START:
 * 1. Ensure dependencies are installed:
 *    npm install @ax-llm/ax
 * 
 * 2. Configure your .env file with OPENROUTER_API_KEY
 * 
 * 3. (Optional) To use production-scale MiPRO v2 optimization:
 *    Ax optimizers depend on a Python optimization service (Optuna).
 *    Start the service before running this script:
 *    cd src/optimizer && uv sync && uv run ax-optimizer server start --debug
 *    Then set OPTIMIZER_ENDPOINT=http://localhost:8000 in your .env
 * 
 * RUNNING:
 * bun run scripts/initialize_agents.ts
 */

import fs from 'fs';
import path from 'path';
import { AxAIOpenRouter, AxBootstrapFewShot, AxMiPRO, AxGen, type AxMetricFn, type AxTypedExample } from '@ax-llm/ax';
import { CHAT_MODEL } from '../src/lib/constants.js';

const SKILLS_DIR = path.join(process.cwd(), 'skills');
const COMPILED_DIR = path.join(process.cwd(), 'src/lib/agents/compiled');

if (!fs.existsSync(SKILLS_DIR)) {
    fs.mkdirSync(SKILLS_DIR, { recursive: true });
}
if (!fs.existsSync(COMPILED_DIR)) {
    fs.mkdirSync(COMPILED_DIR, { recursive: true });
}

// Load environment variables
let apiKey = process.env.OPENROUTER_API_KEY;
let optimizerEndpoint = process.env.OPTIMIZER_ENDPOINT;

if (!apiKey) {
    try {
        const envContent = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf-8').trim();
        if (envContent.includes('=')) {
            const lines = envContent.split('\n');
            for (const line of lines) {
                if (line.startsWith('OPENROUTER_API_KEY=')) {
                    apiKey = line.split('=')[1].trim();
                }
                if (line.startsWith('OPTIMIZER_ENDPOINT=')) {
                    optimizerEndpoint = line.split('=')[1].trim();
                }
            }
        } else if (envContent.length > 20) {
            apiKey = envContent;
        }
    } catch (e) {
        console.warn('Could not load .env file. Proceeding with environment variables.');
    }
}

if (!apiKey) {
    console.error('OPENROUTER_API_KEY is not set. Please add it to .env or environment.');
    process.exit(1);
}

const ai = new AxAIOpenRouter({
    apiKey: apiKey!,
    config: { model: CHAT_MODEL }
});

const agents = [
    {
        id: 'question-improver',
        name: 'QuestionImprover',
        description: `Improve a single survey question and its answer choices. Ensure the wording is clear, unbiased, and follows best practices for survey design based on the question type.`,
        signature: 'questionLabel:string, questionType:string, choices?:string, context?:string -> reasoning:string, improvedLabel:string, improvedChoices:json',
        examples: [
            {
                questionLabel: "How old are you?",
                questionType: "integer",
                choices: "",
                context: "Health survey for seniors",
                reasoning: "The question is clear, but adding context about why we ask for age can improve response rates in health surveys.",
                improvedLabel: "Please enter your age in years. This helps us tailor health recommendations to your age group.",
                improvedChoices: []
            },
            {
                questionLabel: "Do you like our service and the price?",
                questionType: "select_one",
                choices: "[{\"label\": \"Yes\", \"name\": \"yes\"}, {\"label\": \"No\", \"name\": \"no\"}]",
                context: "Customer satisfaction",
                reasoning: "This is a double-barreled question. It asks about service AND price. I will focus it on general satisfaction and suggest splitting it later.",
                improvedLabel: "Overall, how satisfied are you with the service provided?",
                improvedChoices: [
                    { "label": "Very satisfied", "name": "very_satisfied" },
                    { "label": "Satisfied", "name": "satisfied" },
                    { "label": "Neutral", "name": "neutral" },
                    { "label": "Dissatisfied", "name": "dissatisfied" },
                    { "label": "Very dissatisfied", "name": "very_dissatisfied" }
                ]
            }
        ]
    },
    {
        id: 'survey-generator',
        name: 'SurveyGenerator',
        description: `Generate a comprehensive survey based on a research goal. Use the context questions as inspiration for style and formulation.`,
        signature: 'researchQuestion:string, language:string, demographics?:string, contextQuestions?:string -> reasoning:string, generatedQuestions:json',
        examples: [
          {
            researchQuestion: "Employee satisfaction in remote teams",
            language: "informal",
            demographics: "department, years_of_experience",
            contextQuestions: "[]",
            reasoning: "Focusing on communication, work-life balance, and tool adequacy for remote work.",
            generatedQuestions: [
                { "id": "comm_1", "name": "comm_1", "label": "Wie zufrieden bist du mit der Kommunikation in deinem Team?", "type": "select_one", "required": true, "choices": [{ "label": "Sehr zufrieden", "name": "5" }, { "label": "Zufrieden", "name": "4" }, { "label": "Neutral", "name": "3" }, { "label": "Unzufrieden", "name": "2" }, { "label": "Sehr unzufrieden", "name": "1" }] },
                { "id": "tools_1", "name": "tools_1", "label": "Hast du alle Tools, die du für deine Arbeit im Homeoffice brauchst?", "type": "select_one", "required": true, "choices": [{ "label": "Ja, voll und ganz", "name": "yes" }, { "label": "Teilweise", "name": "partial" }, { "label": "Nein", "name": "no" }] }
            ]
          }
        ]
    },
    {
        id: 'structure-improver',
        name: 'StructureImprover',
        description: `Organize survey questions into a logical sequence. Group related topics and ensure smooth transitions.`,
        signature: 'researchQuestion:string, questions:string -> reasoning:string, organizedQuestions:json',
        examples: [
          {
            researchQuestion: "Sustainability habits",
            questions: "[{\"label\": \"Do you recycle?\", \"name\": \"q2\"}, {\"label\": \"What is your name?\", \"name\": \"name\"}, {\"label\": \"How often do you buy organic?\", \"name\": \"q1\"}]",
            reasoning: "Standard demographic questions (name) should come first, followed by general habits, then specific frequency questions.",
            organizedQuestions: [
                { "label": "What is your name?", "name": "name" },
                { "label": "Do you recycle?", "name": "q2" },
                { "label": "How often do you buy organic?", "name": "q1" }
            ]
          }
        ]
    }
];

const metricFn: AxMetricFn = async ({ prediction }) => {
    let score = 0;
    if (!prediction) return 0;
    if (prediction.reasoning && prediction.reasoning.length > 10) score += 0.5;
    if (prediction.improvedLabel || prediction.generatedQuestions || prediction.organizedQuestions) score += 0.5;
    return score;
};

async function initialize() {
    for (const agent of agents) {
        const agentDir = path.join(SKILLS_DIR, agent.id);
        if (!fs.existsSync(agentDir)) {
            fs.mkdirSync(agentDir, { recursive: true });
        }

        console.log(`Optimizing agent: ${agent.name}...`);
        
        const program = new AxGen(agent.signature, { description: agent.description });

        let finalDemos: any[] = [];
        let optimizerType = "none";

        try {
            if (optimizerEndpoint) {
                console.log(`Using AxMiPRO with endpoint: ${optimizerEndpoint}`);
                const optimizer = new AxMiPRO({
                    teacherAI: ai,
                    optimizerEndpoint,
                    numTrials: 5
                });
                const result = await optimizer.compile(program, agent.examples as AxTypedExample<any>[], metricFn);
                finalDemos = result.demos;
                optimizerType = "mipro";
            } else {
                console.log(`Using AxBootstrapFewShot (local)`);
                const optimizer = new AxBootstrapFewShot({
                    teacherAI: ai,
                    maxDemos: 2,
                    maxRounds: 1
                });
                const result = await optimizer.compile(program, agent.examples as AxTypedExample<any>[], metricFn);
                finalDemos = result.demos;
                optimizerType = "bootstrap_few_shot";
            }
            console.log(`Optimization successful for ${agent.name}`);
        } catch (e) {
            console.warn(`Optimization failed for ${agent.name}, using manual demos. Error: ${(e as Error).message}`);
            const inputFields = agent.signature.split('->')[0].split(',').map(f => f.split(':')[0].trim().replace('?', ''));
            const outputFields = agent.signature.split('->')[1].split(',').map(f => f.split(':')[0].trim());
            
            finalDemos = agent.examples.map(ex => ({
                input: Object.fromEntries(Object.entries(ex).filter(([k]) => inputFields.includes(k))),
                output: Object.fromEntries(Object.entries(ex).filter(([k]) => outputFields.includes(k)))
            }));
            optimizerType = "manual";
        }

        const finalOutput = {
            version: "2.0",
            bestScore: 1,
            stats: {
                totalExamples: agent.examples.length,
                totalRounds: 1,
                totalTime: 0
            },
            instruction: agent.description,
            signature: agent.signature,
            demos: finalDemos,
            modelConfig: {
                temperature: 0.1
            },
            optimizerType,
            timestamp: new Date().toISOString()
        };

        // Save compiled JSON in the src/lib directory for the app to load
        fs.writeFileSync(
            path.join(COMPILED_DIR, `${agent.name.toLowerCase()}.json`),
            JSON.stringify(finalOutput, null, 2)
        );

        // Generate SKILL.md with YAML frontmatter in the skills folder
        let skillMarkdown = `---\n`;
        skillMarkdown += `name: ${agent.id}\n`;
        skillMarkdown += `description: "${agent.description}"\n`;
        skillMarkdown += `metadata:\n`;
        skillMarkdown += `  version: "1.0.0"\n`;
        skillMarkdown += `  signature: "${agent.signature}"\n`;
        skillMarkdown += `---\n\n`;
        skillMarkdown += `# ${agent.name}\n\n`;
        skillMarkdown += `${agent.description}\n\n`;
        skillMarkdown += `## Interface\n\n\`${agent.signature}\`\n\n`;
        
        if (agent.examples.length > 0) {
            skillMarkdown += `## Examples\n\n`;
            for (const demo of agent.examples) {
                const inputFields = agent.signature.split('->')[0].split(',').map(f => f.split(':')[0].trim().replace('?', ''));
                const outputFields = agent.signature.split('->')[1].split(',').map(f => f.split(':')[0].trim());
                
                const input = Object.fromEntries(Object.entries(demo).filter(([k]) => inputFields.includes(k)));
                const output = Object.fromEntries(Object.entries(demo).filter(([k]) => outputFields.includes(k)));

                skillMarkdown += `### Example\n**Input:**\n\`\`\`json\n${JSON.stringify(input, null, 2)}\n\`\`\`\n**Output:**\n\`\`\`json\n${JSON.stringify(output, null, 2)}\n\`\`\`\n\n`;
            }
        }

        fs.writeFileSync(path.join(agentDir, 'SKILL.md'), skillMarkdown);

        // Package the skill into a ZIP file (containing the folder with only SKILL.md)
        try {
            const { execSync } = await import('child_process');
            const zipName = `${agent.id}.zip`;
            const zipPath = path.join(SKILLS_DIR, zipName);
            
            if (fs.existsSync(zipPath)) {
                fs.unlinkSync(zipPath);
            }

            execSync(`zip -r ${zipName} ${agent.id}`, { cwd: SKILLS_DIR });
            console.log(`Packaged skill: ${zipName}`);
        } catch (e) {
            console.warn(`Failed to package ${agent.name} as ZIP: ${(e as Error).message}`);
        }
    }

    console.log('Skills documented in skills/ and compiled programs saved to src/lib/agents/compiled/.');
}

initialize().catch(console.error);
