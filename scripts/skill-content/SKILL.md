---
name: generating-xlsforms
description: "Generates XLSForm survey files for survey tools such as Kobo Toolbox. Triggers when the user wants to create or convert a survey, questionnaire, or data collection form. German triggers: 'Fragebogen', 'Umfrage', 'Erhebungsinstrument', 'Zufriedenheitsbefragung', 'Bedarfserhebung', 'Wirkungsmessung'. Requires the qwacback MCP server to be configured for best results."
---

# XLSForm Generator

Output language: match the language the user writes in. Variable names always in English snake_case.

**Prerequisites:** The `qwacback` MCP server must be configured to use MCP tools. REST API fallbacks are available if not.

## Workflow

- [ ] Step 0: Load references
- [ ] Step 1: Intake — clarify goal if needed
- [ ] Step 2: Search qwac for validated instruments
- [ ] Step 3: Generate XLSForm
- [ ] Step 4: Validate and deliver

---

## Step 0: Load References

Read these files before generating any form:

| File | Contents |
|------|----------|
| [references/survey-methodology.md](references/survey-methodology.md) | Survey methodology + XLSForm spec: question formulation, structure, DSGVO, column definitions, code patterns, quality checklist |
| [references/demographic-templates.md](references/demographic-templates.md) | Pre-fetched validated demographic items from qwac |

If a reference file is missing or empty, use the MCP tools in Step 2 to retrieve the data at runtime.

## Step 1: Intake

**Default: infer and build.** Only ask if something critical is genuinely missing and cannot be reasonably inferred from context.

- If the user's request contains a clear goal, target group, and purpose → skip directly to Step 2.
- If the goal is clear but target group or purpose is missing → ask one short combined question, then proceed.
- If the goal itself is too vague to design a form → ask only: "What do you want to find out?" (in the user's language)
- Never ask about things that can be inferred (platform, language, length, privacy needs).

From whatever information is available, infer:
- Research questions (sharpen vague goals into 1–5 specific questions)
- Constructs to measure
- Target group and likely demographics
- Length estimate and privacy requirements

### Phase 1 — Goal

If not clear from context, ask for the research goal in one sentence — in the user's language. Sharpen into 1–5 specific research questions. Infer constructs, target group, length, privacy needs.

### Phase 2 — Context

If target group or use of results is missing, ask once — in the user's language. Accept sparse answers. Infer everything else.

### Phase 3 — Biographic correlates

Skip unless the user signals analytical intent (*Zusammenhang, Unterschied, vergleichen, aufschlüsseln nach, Subgruppen*) or explicitly names demographic variables. If skipped, include minimal defaults: age as integer, gender.

**LLM inferences** (user can override any):

| Aspect | Default |
|--------|---------|
| Constructs | Derived from research questions; searched in qwac automatically |
| Length | As short as possible; target 5–10 min |
| Privacy | DSGVO notice if any demographics; "Keine Angabe" for sensitive questions |
| Platform | Generic XLSForm (KoboToolbox/ODK compatible) |

## Step 2: Search qwac for Validated Instruments

Always search qwac before writing questions from scratch. Prefer validated instruments.

**MCP tools:**
- `qwacback:search_studies` — find complete survey batteries by topic
- `qwacback:search_questions` — find validated individual questions
- `qwacback:get_question` — retrieve single question by ID

Check `references/demographic-templates.md` for pre-fetched standard demographic items.

When relevant instruments are found: summarize briefly and confirm with user before incorporating.

## Step 3: Generate the XLSForm

Follow [generate-instructions.md](generate-instructions.md) for the full output format and rules.

Additional essentials (full spec in [references/survey-methodology.md](references/survey-methodology.md)):
- Always include `start`, `end`, `today`, `deviceid` metadata rows
- Group with `begin_group` / `end_group`; skip logic in `relevant` column
- All labels, hints, constraint messages in the survey language

## Step 4: Validate and Deliver

Run the quality checklist from `references/survey-methodology.md` before delivering.

Deliver:
1. The `.xlsx` file
2. Summary: sections, question count, estimated completion time, skip logic
3. What came from qwac (if any)
4. Reminder to test before deployment (KoboToolbox upload or https://getodk.org/xlsform/)
5. Ask if anything should be changed — in the user's language

If changes requested: apply, re-run quality checklist, re-deliver.