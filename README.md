# FormulAid

[![AI-Assisted](https://img.shields.io/badge/AI--assisted-Claude%20Code-blueviolet?logo=anthropic&logoColor=white)](./AI_DISCLOSURE.md)

A SvelteKit web app that generates [XLSForm](https://xlsform.org/) survey files. Uses `@ax-llm/ax` (TypeScript DSPy) with the [qwac](https://qwac.correlaid.org/) question bank to generate validated survey instruments.

Also ships as a **Claude Code skill** for terminal/IDE use — see [Skills](#skills).

## Prerequisites

- [Bun](https://bun.sh/) (package manager and runtime)
- [Node.js](https://nodejs.org/) >= 20
- An [OpenRouter](https://openrouter.ai/) API key (only for `test:workflow`)
- For the end-to-end tests: [uv](https://docs.astral.sh/uv/), and Java for ODK Validate (optional locally)

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

## Testing

```sh
bun run test       # unit tests
bun run test:e2e   # end-to-end: generated questionnaires → formtransform, LimeSurvey, Kobo
```

Both run in CI (`.github/workflows/ci.yml`) without a model or any secret.

### End-to-end (`tests/e2e/`)

Every fixture in `tests/e2e/fixtures/` holds a model's raw `generatedQuestions` plus the research questions and demographics. `pipeline.test.ts` runs it through the same code as the app after the model step (parse → `assembleSurvey` → workbook) and checks that:

- the formtransform validator reports no errors (warnings are snapshotted);
- formtransform converts it to a LimeSurvey TSV with every question, answer code and skip condition, and the opening/closing notes as welcome/end texts;
- the TSV converts back to XLSForm with the same questions and codes.

It writes the workbooks to `tests/e2e/output/`, and `test_pyxform.py` converts them with [pyxform](https://github.com/XLSForm/pyxform), the converter Kobo and ODK use on import, failing on errors and warnings. With Java installed, ODK Validate runs as well (`E2E_ODK_VALIDATE=0` skips it).

Fixtures are either hand-written for one known problem or saved from real runs (`real-*.json`, see below). A bug found in a real generation gets a fixture first, then a fix.

Known gap: answers marked `exclusive` ("Keine Angabe") lose that flag in LimeSurvey ([formtransform#53](https://github.com/CorrelAid/formtransform/issues/53)); the test for it is marked as an expected failure.

### Real generations

```sh
bun run test:workflow                  # all cases; TEST_CASE=2 runs one
bun run test:workflow --save-fixture   # also saves each raw output as tests/e2e/fixtures/real-*.json
```

Runs the test cases through the full pipeline against OpenRouter (`OPENROUTER_API_KEY`, costs about $0.02 per case) and saves the outputs to `scripts/test_output/`. It prints the bank search, the questions and which research question each one serves. Override the model with `TEST_MODEL=<openrouter-slug>`.

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
