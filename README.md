# FormulAid

[![AI-Assisted](https://img.shields.io/badge/AI--assisted-Claude%20Code-blueviolet?logo=anthropic&logoColor=white)](./AI_DISCLOSURE.md)

A SvelteKit web app that generates [XLSForm](https://xlsform.org/) survey files. Uses `@ax-llm/ax` (TypeScript DSPy) with the [qwac](https://qwac.correlaid.org/) question bank to generate validated survey instruments.

Also ships as a **Claude Code skill** for terminal/IDE use — see [Skills](#skills).

## Prerequisites

- [Bun](https://bun.sh/) (package manager and runtime)
- [Node.js](https://nodejs.org/) >= 20
- An [OpenRouter](https://openrouter.ai/) API key

## Setup

```sh
bun install
cp .env.example .env
# fill in OPENROUTER_API_KEY
```

### Environment variables

| Variable             | Required           | Description                                                                                                        |
| -------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `OPENROUTER_API_KEY` | Yes (scripts only) | Used by `scripts/initialize_agents.ts` for agent optimization. The web app takes the key from the user at runtime. |
| `GITHUB_TOKEN`       | No                 | Avoids GitHub API rate limits (60 req/h unauthenticated) when fetching CDL content snippets during build.          |

## Developing

```sh
bun run dev
```

## Building

```sh
bun run build
```

Preview the production build locally:

```sh
bun run preview
```

## Deployment

Deployed via [Coolify](https://coolify.io/) using [nixpacks](https://nixpacks.com/). The `nixpacks.toml` pins the Node and Bun versions used in the build container. The production server runs `bun serve.js`.

## Testing the AI workflow

```sh
bun run test:workflow
```

Runs three test cases (employee satisfaction, NGO member survey, impact measurement) through the full pipeline and saves outputs to `scripts/test_output/` as `questionnaire.xlsx` + `questions.json`. Override the model with `TEST_MODEL=<openrouter-slug>`.

## Skills

The survey generation logic is also packaged as a Claude Code skill for use in the Claude web app:

1. **Add the MCP connector** — go to **Customize → Add custom connector**, enter `https://qwacback.correlaid.org/mcp`
2. **Install the skill** — download [`skills/xlsform.zip`](https://github.com/CorrelAid/formulaid/raw/main/skills/xlsform.zip), then go to **Customize → Skills → upload** the zip file

Rebuild the skill with fresh reference data from qwac and civic-data.de:

```sh
bun run build:skill
```

## Architecture

FormulAid ships in two forms — web app and Claude Code skill — that share the same prompts, reference data, and backend tools.

### Prompts

`scripts/skill-content/generate-instructions.md` is the single source of truth for the generation instruction:

- Imported via `?raw` in `src/lib/agents/survey_generator.ts` → used as the `AxGen` system description
- Copied by `build_skill.sh` to `skills/xlsform/generate-instructions.md` → referenced in SKILL.md Step 3

### Reference data

`build_skill.sh` fetches live data from civic-data.de and the qwacback API. The methodology is embedded into `generate-instructions.md` at build time (used as the AxGen system prompt in the web app; read directly by Claude Code in the skill):

| File                                  | Skill          | Web app                                             |
| ------------------------------------- | -------------- | --------------------------------------------------- |
| `generate-instructions.md`            | read in Step 3 | `?raw` import → AxGen system description            |
| `references/demographic-templates.md` | read in Step 0 | not used (demographics hardcoded in `constants.ts`) |

### Question bank

Both look for validated instruments in the **qwac question bank** before writing questions from scratch, but differently.

|        | Claude Code skill                                                      | Web app                                                                                                                            |
| ------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Access | native `qwacback:*` tools via the MCP connector                        | qwac's REST API (`/api/questions`), `src/lib/agents/qwacback.ts`                                                                   |
| Search | `search_questions`, `search_studies`, `get_question`, `list_questions` | a short model call proposes keywords (`keyword_agent.ts`); the search runs in code, without the demographic standards, top 30 hits |
| When   | Step 2, explicit                                                       | a fixed step before generation; the hits go into the generator prompt as `questionBank`                                            |

### What is not shared

|                | Skill                                          | Web app                                  |
| -------------- | ---------------------------------------------- | ---------------------------------------- |
| Intake         | Conversational phases 1–3                      | 3-section wizard form                    |
| XLSForm output | Claude Code writes `.xlsx` directly            | `XLSFormGenerator` builds it server-side |
| Demographics   | fetched from qwac / `demographic-templates.md` | hardcoded in `src/lib/constants.ts`      |

## AI usage

See [AI_DISCLOSURE.md](./AI_DISCLOSURE.md).
