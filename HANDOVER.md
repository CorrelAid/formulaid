# Handover: aligning formulaid with the formtransform registry

Moved here from `CorrelAid/formtransform` (2026-09-24); "this repo" /
"this registry" below mean formtransform, and relative paths like
`codegen/emit_skill.py` are formtransform paths.

Audience: whoever (person or agent) picks up
[`CorrelAid/formulaid`](https://github.com/CorrelAid/formulaid) next — the
SvelteKit app plus the `generating-xlsforms` Claude skill that generate XLSForm
questionnaires. This document is the plan; the work is split into issues in that
repo, linked below. Each issue stands on its own — an agent should be able to act
on one without reading the others.

Companion document: [`HANDOVER_QWAC.md`](https://github.com/CorrelAid/formtransform/blob/main/HANDOVER_QWAC.md) (the question-bank
browser, which shares the upstream gap described below).

## The problem

formulaid produces the input to the CDL survey pipeline, and it does so without
consulting the registry that defines what the pipeline accepts. Two independent
halves, both drifting:

**The skill teaches more XLSForm than exists here.**
`scripts/build_skill.sh` fetches `umfragen.civic-data.de/llm-phases12-xlsform.txt`
into `references/survey-methodology.md` (~1630 lines). Roughly:

| Lines | Content | Verdict |
|---|---|---|
| ~35–247 | Studiendesign, Forschungsfragen, Messtheorie, Stichprobenauswahl, Datenschutz, Operationalisierung | Keep — the real value, no upstream equivalent |
| ~248–1243 | `# XLSForm-Dokumentation`: Fragetypen, hints, constraint, relevant, **Berechnung** (`calculation`), Gruppierung, Mehrsprachigkeit, Darstellung, settings sheet, "Anhang – Laden großer CSV-Dateien" | The general xlsform.org spec — this is the problem |
| ~1244–1549 | `# Antworttypen`, including "Weitere Antwortformate" and "Nicht empfohlene Antwortformate" | Overlaps the registry's catalogue and contradicts its allowlist |

This registry is an **allowlist**: unregistered question types, unregistered
appearances, over-long identifiers, nesting deeper than three levels and selects
without an explicit `list_name` are *rejected*, not approximated — see
[Supported XLSForm Subset](https://github.com/CorrelAid/formtransform/blob/main/README.md#supported-xlsform-subset). A model reading
the full specification will confidently emit forms that fail conversion, and the
failure surfaces in a different repo, far from its cause.

**The app never checks its own output.**
`src/lib/agents/xlsform_generator.ts` builds the workbook with `xlsx`
(`XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })`) and hands it straight to
the download button. `src/lib/agents/types.ts` hardcodes the vocabulary:

```ts
export type QuestionType = 'select_one' | 'select_multiple' | 'text' | 'integer' | 'decimal' | 'date' | 'note';
```

— a hand-picked subset of the registry's list, with nothing keeping it aligned.

## What this repo can and cannot hand over

Available now from the package root (`github:CorrelAid/formtransform`):

- `XLSValidator.validateSubset(survey, choices)` and the `SubsetViolation`
  type — validate a parsed workbook and get findings back instead of an
  exception. This is the one formulaid wants: the
  point is to *repair and report*, not to abort.
- `XLSLoader.parseXLSData(data, { skipValidation? })` — parse a workbook into row
  arrays; validates and throws by default.
- `XLSFormParser.convertXLSDataToTSV`, `buildDdiXml`, `lstsvToDdiXml`,
  `lstsvToXlsform` — the four supported directions, if the app ever wants to offer
  LimeSurvey TSV or DDI alongside the `.xlsx`.
- `QUESTION_TYPES` — the labelled type catalogue (formtransform#6, shipped):
  per type `label` (from `skos:prefLabel`), `useWhen` (methodology guidance),
  `base` / `bases` for variants and composites, and `constraints`. Emitted
  `as const`, so `keyof typeof QUESTION_TYPES` gives a literal union. **This
  replaces the hand-written `QuestionType` union.**
- `APPEARANCES` — the appearance allowlist, with the types each is valid for.
- `TYPE_MAPPINGS` — per-type mapping facts (`kind`, `limeSurveyType`,
  `supported`, `requiresListName`, `answerClass`, `dateFormat`).
- `skills/cdl-survey-types/` — the generated sub-skill: `SKILL.md` plus
  `references/question-types.md` and `references/xlsform-syntax.md`, regenerated
  by `uv run codegen`, portable to any agent runtime that reads the format. Its
  emitter docstring names formulaid's `generating-xlsforms` as the intended
  parent: the parent owns the workflow (intake, qwac search, delivery), the
  sub-skill owns "which type, and how to write it". Not part of the npm-format
  package — fetched from this repo at a pinned ref.

Everything exported from the package root is browser-safe (formtransform's
`ARCHITECTURE.md`, "The browser boundary"), so the app can validate in the
browser with no service.

**Status as of 2026-09-24:**

- **No tags yet.** formtransform has never been tagged, so "pin to a tag" can't
  be followed today. Pin a **commit SHA** (for both the npm dependency
  `github:CorrelAid/formtransform#<sha>` and the sub-skill fetch) and switch to
  the first tag once it exists. A `v0.1.0` tag is planned right after
  formtransform#23. A tarball on release tags is formtransform#4 (open).
- **Known browser bug, formtransform#23:** in browser bundles `js-xpath` fails
  to load, and XLSForm → LimeSurvey TSV conversion silently turns every
  `relevant` into `1`. **Validation (`XLSValidator`) is not affected**, since it
  doesn't parse XPath. Don't offer TSV conversion in the browser until #23 is
  fixed. The fix replaces `js-xpath` in formtransform, so no bundler alias or
  patch is needed on formulaid's side.
- formulaid#12 (upstream gaps) is closed: the catalogue shipped as
  formtransform#6, and the release asset is tracked as formtransform#4.

## The issues

| # | Issue | When |
|---|---|---|
| 1 | [#9 Bundle the generated `cdl-survey-types` sub-skill into the skill build](https://github.com/CorrelAid/formulaid/issues/9) | first |
| 2 | [#10 Strip the generic XLSForm spec from the skill references](https://github.com/CorrelAid/formulaid/issues/10) | after #9 — never before |
| 3 | [#11 Validate generated workbooks with the library before download](https://github.com/CorrelAid/formulaid/issues/11) | any time; app-side, independent of the skill work |
| — | [#12 Upstream gaps: labelled catalogue, sub-skill release asset](https://github.com/CorrelAid/formulaid/issues/12) | closed (catalogue shipped; asset → formtransform#4) |

Order matters between #9 and #10: #10 removes the reference content that #9
replaces, and doing it the other way round leaves the skill with no type
reference at all for however long the gap lasts.

`scripts/build_skill.sh` already fetches remote content (llm.txt, qwacback
demographics) into `references/`, so vendoring the sub-skill from a pinned tag
fits the shape that exists. One hard requirement: **a failed fetch must fail the
build.** A skill shipped without its type reference is worse than a stale one,
because the model silently falls back on generic XLSForm knowledge — the exact
failure mode this work exists to remove. Remember that `skills/xlsform.zip` is
what the README tells users to upload, so a rebuild that is not committed changes
nothing for them.

Issue #11 implements existing formulaid issue
[#4](https://github.com/CorrelAid/formulaid/issues/4) ("Let xlsform be validated
and try again with error messages"), which asks whether to add validation to
qwacback or "use some existing package". The package is this library; it runs in
the browser, needs no service and no network hop, and it is the *same* check the
downstream converters apply — so a form that passes it is a form that converts.

## Hard rules for whoever does the work

- **Do not modify this repo from formulaid.** Missing capability → open an issue
  here (that is what #12 is for).
- **Do not hand-edit the vendored `cdl-survey-types/` files.** They carry a
  "GENERATED — DO NOT EDIT" header; a local edit is overwritten on the next build
  and diverges from what the converters enforce in the meantime.
- **Do not delete the methodology content.** The German survey-methodology
  material is this skill's actual value-add and exists nowhere upstream. Only the
  XLSForm *specification* sections go.
- **Do not reimplement subset rules in the app.** Call `XLSValidator`. If a rule
  looks wrong or missing, that is a finding for this repo.
- **Never ship an invalid form silently.** Cap the repair attempts, then deliver
  with the remaining findings shown — a partially convertible form plus an honest
  warning beats both a spinner that never resolves and a clean-looking download
  that fails later.
- **Pin to tags (a commit SHA until the first tag exists), never branches.** A
  registry change should never alter a shipped skill or a deployed app without a
  commit in formulaid.

## Related documents

- [`README.md`](https://github.com/CorrelAid/formtransform/blob/main/README.md) — what this repo ships and to whom
- [`ARCHITECTURE.md`](https://github.com/CorrelAid/formtransform/blob/main/ARCHITECTURE.md) — registry → codegen → artifacts
- `codegen/emit_skill.py` — the emitter that writes `skills/cdl-survey-types/`,
  and the contract it assumes with the parent skill
- [`HANDOVER_QWAC.md`](https://github.com/CorrelAid/formtransform/blob/main/HANDOVER_QWAC.md) — the question-bank browser's plan,
  sharing the catalogue gap
