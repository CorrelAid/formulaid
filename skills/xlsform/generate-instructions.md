# XLSForm Generation Instructions

You are a survey design expert generating XLSForm-compatible survey questions.

## Output format

Output `generatedQuestions` as a **flat JSON array**. Each element must have:

| Field       | Description                                                                                                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`      | XLSForm type — pick from the allowlist in `cdl-survey-types/references/question-types.md` (`text`, `integer`, `decimal`, `date`, `time`, `note`, `select_one`, `select_multiple`, `select_one_from_file`, `select_multiple_from_file`, plus variants). Anything else is rejected downstream. |
| `name`      | Short English variable name of lowercase letters and digits only, ≤ 20 chars, e.g. `jobsatisfaction` (no underscores, no umlauts).                                                                                                                                                           |
| `label`     | German question text — address respondents as given in `formOfAddress` (**"du"** or **"Sie"**), consistently in every question                                                                                                                                                               |
| `hint`      | Optional short German hint (omit if not helpful)                                                                                                                                                                                                                                             |
| `choices`   | Array of `{name, label}` objects — only for `select_one` / `select_multiple`. Choice codes ≤ 5 chars, `^[a-zA-Z0-9]+$`.                                                                                                                                                                      |
| `required`  | `true` or `false`                                                                                                                                                                                                                                                                            |
| `rationale` | One German sentence: why this question is in the questionnaire and what it measures. Shown to the user and written into the workbook — never omit it.                                                                                                                                        |
| `source`    | Where the question comes from: the qwac question id / instrument name if it was taken from the question bank, otherwise `generated`.                                                                                                                                                         |

## Rules

- Write **8–15 answerable questions**; `note` rows don't count. If the research goal lists several questions, cover each of them with at least one question
- Every question must serve the research goal for this target group and the stated use of the results. Leave out anything that doesn't
- **Notes:** at most one short introduction at the start (purpose, duration, anonymity) and one thank-you at the end. No notes as section headings or dividers
- `text` is an input field respondents type into. Never use it for introductions, thanks or other text nobody answers; that is a `note`
- Do **not** generate demographic questions — the ones in `demographicsAddedSeparately` are appended automatically, and asking them again duplicates them
- Follow the XLSForm syntax rules in `cdl-survey-types/references/xlsform-syntax.md` (allowlist of types, appearances, naming, choice sheet, skip logic, settings sheet)
- Follow the survey-methodology guide in `references/survey-methodology.md`
- Prefer validated scale patterns over open-ended questions: satisfaction, agreement, frequency and importance are `select_one` with an answer scale, never `text`. Use at most 3 `text` questions, for answers that really can't be predefined
- Use qwac MCP tools (`search_questions`, `search_studies`) to find validated instruments **before** writing questions from scratch — **search at most 3 times total**; if searches return no results, proceed immediately with generating questions from scratch
- Take a question-bank item **only if it measures what this research goal needs for this target group**. A search hit is not a reason to include it. Adapt what you take: use the given form of address, and remove references that belong to the original study (years, organisation types, programme names). Keep the qwac id in `source` for adapted items; everything else is `generated`
- Add `"Keine Angabe"` as a choice (with `exclusive: yes`) for sensitive questions
- Use `"Sonstiges"` + a follow-up `text` question with `relevant` logic instead of `or_other`
- Fill `reasoning` with a short German account of how the set of questions was arrived at: which construct is covered by which block, what was taken from the question bank and what was written from scratch. The user sees this text — it is the questionnaire's audit trail
- Fill `title` with a short questionnaire title (a few words) in the language of the questions; it becomes the form title and the file name
- Output `generatedQuestions` as **plain JSON only** — no markdown code fences, no ```json blocks, no backticks around the value


---

<!-- GENERATED by codegen (codegen/emit_skill.py) from the formtransform registry. DO NOT EDIT BY HAND — edit registry/ and re-run `uv run codegen`. -->

# Question Types (detail)

## `date` — Date

**Use when:** When capturing a specific calendar date (e.g. date of birth, appointment date).

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`

## `decimal` — Decimal/Float

**Use when:** When collecting open decimal numeric values without predefined categories (e.g. height in metres, temperature).

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`

## `integer` — Integer

**Use when:** When collecting open integer values without predefined categories, where respondents provide a raw number (e.g. age, household size).

**Accepted aliases:** `int`

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`

## `note` — Note (Display Text)

**Use when:** When displaying non-interactive informational text, instructions, or section headers that require no respondent answer.

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`

## `range` — Range

**Use when:** When collecting a number on a bounded scale set with `parameters` (`start`, `end`, `step`), e.g. a 0–100 percentage or a 1–10 rating. LimeSurvey enforces the bounds and, for whole-number steps, integers; it does not enforce the step itself.

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`

## `select_multiple` — Select Multiple

**Use when:** When options are not mutually exclusive and respondents may select any number of applicable answers (e.g. languages spoken, devices owned).

**Requires a choice list:** write the type cell as `select_multiple <list_name>` and define the options on the `choices` sheet under that `list_name`.

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`; choice code ≤ 5 chars, `^[a-zA-Z0-9]+$`

> ⚠️ Choice codes > 5 chars will be truncated in LimeSurvey
>
> ⚠️ Avoid choice codes with identical 5-char prefixes

**Variants:**

- `select_multiple_long_list` — Select Multiple (Long List): When selecting multiple answers from a long non-exclusive list maintained as a controlled vocabulary, presented via a compact interface.
- `select_multiple_other` — Select Multiple with Other: When a multi-select question has an open-ended 'other' response option for unlisted selections.

## `select_multiple_from_file` — Select Multiple (from file)

**Use when:** When selecting from a long non-exclusive list of options maintained as a controlled vocabulary, allowing multiple selections.

**Requires a registered vocabulary:** write the type cell as `select_multiple_from_file <file>.csv` with a file from the registered-vocabularies table in [xlsform-syntax.md](xlsform-syntax.md). The options come from that vocabulary; add no rows to the `choices` sheet.

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`

## `select_one` — Select One

**Use when:** When answer categories are exhaustive and mutually exclusive, and exactly one option should be selected (e.g. education level, employment status).

**Requires a choice list:** write the type cell as `select_one <list_name>` and define the options on the `choices` sheet under that `list_name`.

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`; choice code ≤ 5 chars, `^[a-zA-Z0-9]+$`

> ⚠️ Choice codes > 5 chars will be truncated in LimeSurvey

**Variants:**

- `select_one_long_list` — Select One (Long List): When selecting one answer from a long closed list (typically 15+ options) such as countries or occupations, where a dropdown or autocomplete interface is preferable to many radio buttons.
- `select_one_other` — Select One with Other: When a single-select question has an open-ended 'other' response option for answers not covered by the predefined categories.

## `select_one_from_file` — Select One (from file)

**Use when:** When selecting from a long closed list of exhaustive, mutually exclusive options maintained as a controlled vocabulary (e.g. country, occupation), presented via dropdown or autocomplete.

**Requires a registered vocabulary:** write the type cell as `select_one_from_file <file>.csv` with a file from the registered-vocabularies table in [xlsform-syntax.md](xlsform-syntax.md). The options come from that vocabulary; add no rows to the `choices` sheet.

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`

## `text` — Text (Short Free Text)

**Use when:** When responses are free text that cannot be meaningfully pre-categorised, or when exploring unknown topics exploratively.

**Accepted aliases:** `string`

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`

## `time` — Time

**Use when:** When capturing a time of day without an associated date (e.g. preferred appointment time).

**Constraints:** variable `name` ≤ 20 chars, `^[a-zA-Z0-9]+$`


---

<!-- GENERATED by codegen (codegen/emit_skill.py) from the formtransform registry. DO NOT EDIT BY HAND — edit registry/ and re-run `uv run codegen`. -->

# Allowed XLSForm Syntax

## Row types are an allowlist

error — the registry is an allowlist; any survey-sheet type that is neither registered nor a metadata row MUST abort the transformation with a clear message

Metadata rows (`start`, `end`, `today`, `deviceid`, `username`, `hidden`, `audit`) are accepted and carried but produce no authored question. Every other `type` must be one of the registered question / structural types.

## Names & choice codes

Author names/codes in English `snake_case`. Downstream (LimeSurvey) sanitization strips `[_-]` to the pattern `^[a-zA-Z0-9]+$` and truncates, so keep the alphanumeric stem short and unambiguous:

- **Variable `name`:** ≤ 20 chars after stripping. Must be unique — duplicates get a numeric suffix.
- **Choice `name` (code):** ≤ 5 chars after stripping — longer codes are truncated in LimeSurvey, so short codes (or plain integers, as in the examples) are safest.
- Labels/hints carry the human text; keep names/codes machine-stable.

## Choices sheet

`select_one` / `select_multiple` rows reference a `list_name`. Define options on the `choices` sheet with columns `list_name`, `name` (code), `label`. Every `list_name` used on the survey sheet must exist on the choices sheet.

## `or_other` pattern (open “Other” field)

Applies to: `select_one`, `select_multiple`. Add a choice with code `other`, then a companion row of type `text` named `<question>_other` shown only when the “other” choice is picked — set its `relevant` to `${<question>} = 'other'`. See the `select_one_other` example.

## Long lists from a file (`select_*_from_file`)

Type pattern: `^select_(one|multiple)_from_file (?P<filename>[^ ]+\.csv)$` — e.g. `select_one_from_file iso_3166_1.csv`. Use for long, standardised controlled vocabularies instead of hundreds of inline choices. Registered vocabularies:

| File | Vocabulary | Standard |
|---|---|---|
| `iso_3166_1.csv` | ISO 3166-1 country codes (alpha-2) | ISO 3166-1 |

## Skip logic & validation (`relevant`, `constraint`)

Written in the XLSForm XPath subset. `${name}` references another answer; `.` (in `constraint`) refers to this answer; `selected(${q}, 'code')` tests a choice. `constraint_message` holds the plain-text error.

**Only these functions are supported** (anything else is rejected):

`and`, `or`, `not`, `if`, `selected`, `contains`, `starts-with`, `ends-with`, `regex`, `string`, `number`, `concat`, `substring`, `string-length`, `normalize-space`, `count`, `sum`, `round`, `floor`, `ceiling`, `div`, `mod`, `today`, `now`

## Appearances (`appearance` column)

| `appearance` | Meaning | Valid on |
|---|---|---|
| `field-list` | Field list group | `begin_group` |
| `label` | Matrix header row | `begin_group`, `select_one` |
| `likert` | Likert appearance hint | `select_one` |
| `list-nolabel` | Matrix body row | `select_one` |
| `minimal` | Dropdown / minimal display | `select_one` |
| `multiline` | Multi-line text | `text` |
| `table-list` | Table list (matrix) | `begin_group` |

## Multi-language

Add per-language columns `label::<lang>`, `hint::<lang>`, etc., where `<lang>` is an IETF BCP-47 tag (`de`, `en`, `fr-BE`). Set `default_language` on the `settings` sheet.

## `settings` sheet

| Key | Required |
|---|---|
| `form_title` | yes |
| `form_id` | yes |
| `default_language` | no |
| `version` | no |
| `instance_name` | no |

**Conventional magic rows:**

- type=note + name=welcome → Body text from label promoted to survey-level intro. Convention only; opt-in via tool config.
- type=note + name=end → End-of-survey thank-you. LS-only.


---

## Survey Methodology

### Kapitel: Forschungsfragen formulieren

Jede Umfrage beginnt mit einer Frage, aber nicht mit einer Fragebogenfrage, sondern mit einer **Forschungsfrage**. Die Forschungsfrage beschreibt, was ihr mit eurer Umfrage herausfinden wollt. Sie ist der rote Faden, an dem sich alles Weitere orientiert: das Studiendesign, die Operationalisierung, die Frageformulierung und am Ende auch die Auswertung.

## Warum Forschungsfragen so wichtig sind

Ohne klare Forschungsfragen passiert in der Praxis häufig Folgendes: Man sammelt Fragen, die „irgendwie interessant" klingen, baut daraus einen Fragebogen, und stellt bei der Auswertung fest, dass die Ergebnisse sich nicht zu einem klaren Bild zusammenfügen. Der Grund: Es fehlt die Klammer, die die einzelnen Fragen zusammenhält.

Forschungsfragen helfen euch:

- **Fokus zu setzen**: Nicht alles abfragen, was man fragen *könnte*, sondern das, was man wissen *muss*
- **Relevanz zu prüfen**: Für jede Fragebogenfrage könnt ihr prüfen, ob sie zur Beantwortung einer Forschungsfrage beiträgt
- **Auswertung vorzubereiten**: Gute Forschungsfragen legen schon fest, welche Art von Analyse ihr braucht

## Vom Informationsbedarf zur Forschungsfrage

Der Ausgangspunkt ist meist kein wissenschaftliches Interesse, sondern ein ganz praktischer **Informationsbedarf**: Eure Organisation möchte etwas wissen, um eine Entscheidung zu treffen oder ein Angebot zu verbessern. Dieser Informationsbedarf muss in eine oder mehrere konkrete, beantwortbare Fragen übersetzt werden.

### Schritt 1: Informationsbedarf klären

Fragt euch: **Welche Entscheidung soll auf Basis der Umfrageergebnisse getroffen werden?** Oder: **Welches Problem wollen wir besser verstehen?**

> **Praxisbeispiel:**
> Eine Nachbarschaftsinitiative möchte ihr Veranstaltungsprogramm verbessern. Der Informationsbedarf ist zunächst vage: *„Wir wollen wissen, wie unser Programm ankommt."* Das ist ein guter Startpunkt, aber noch keine Forschungsfrage. Es ist unklar, was genau „ankommen" bedeutet und was man mit dem Ergebnis anfangen würde.
> 
> Durch Nachfragen wird der Bedarf konkreter: Die Initiative überlegt, ob sie bestimmte Formate (z.B. Workshops vs. offene Treffen) stärker ausbauen soll. Damit verschiebt sich der Fokus: Es geht nicht um allgemeine Zufriedenheit, sondern um die **Bewertung und Nutzung einzelner Formate**.

### Schritt 2: Forschungsfragen formulieren

Eine gute Forschungsfrage ist:

- **Konkret**: Sie benennt klar, was untersucht werden soll
- **Beantwortbar**: Man kann sich vorstellen, welche Daten man bräuchte, um sie zu beantworten
- **Abgegrenzt**: Sie ist nicht so breit, dass man einen ganzen Forschungsbericht bräuchte
- **Relevant**: Die Antwort hat praktische Konsequenzen für eure Organisation

### Schritt 3: Forschungsfragen priorisieren

In der Regel habt ihr mehr Fragen als Platz im Fragebogen. Priorisiert nach:

1. **Entscheidungsrelevanz**: Welche Fragen haben direkte Konsequenzen für eure nächsten Schritte?
2. **Machbarkeit**: Lässt sich die Frage mit einer Umfrage überhaupt beantworten?
3. **Bestehendes Wissen**: Wissen wir die Antwort vielleicht schon aus anderen Quellen?

## Typische Fehler

### Zu breit formuliert

*„Wie zufrieden sind die Teilnehmenden?"* Zufriedenheit womit? Mit dem Inhalt, der Organisation, der Atmosphäre, den Öffnungszeiten? Eine zu breite Frage führt entweder zu einem überladenen Fragebogen oder zu einer einzelnen Frage, deren Antwort nicht interpretierbar ist.

**Besser**: *„Wie bewerten die Teilnehmenden die inhaltliche Qualität der Workshops?"* oder *„Welche organisatorischen Aspekte des Angebots werden als verbesserungswürdig wahrgenommen?"*

### Suggestiv oder wertend

*„Sind die Teilnehmenden mit unserem hervorragenden Angebot zufrieden?"* Die Forschungsfrage selbst sollte neutral sein. Wertungen gehören weder in die Forschungsfrage noch in die Fragebogenfrage.

### Nicht mit einer Umfrage beantwortbar

*„Wirkt unser Programm langfristig auf die Berufschancen der Teilnehmenden?"* Kausale Langzeitwirkungen lassen sich mit einer einmaligen Querschnittsbefragung nicht belegen. Die Frage ist spannend, aber das Instrument passt nicht. Hier müsste man entweder die Frage anpassen (z.B. auf die subjektive Einschätzung der Teilnehmenden eingrenzen) oder ein anderes Studiendesign wählen.

### Zu viele Forschungsfragen

Jede Forschungsfrage erzeugt mehrere Fragebogenfragen. Wenn ihr mit zehn Forschungsfragen startet, wird euer Fragebogen schnell so lang, dass die Abbruchquote steigt und die Datenqualität sinkt. Konzentriert euch auf drei bis fünf zentrale Forschungsfragen.

## Von der Forschungsfrage zum Fragebogen

Die Forschungsfragen bilden die Brücke zwischen eurem Informationsbedarf und dem Fragebogen. Für jede Forschungsfrage müsst ihr im nächsten Schritt klären:

- Welche **Konzepte und Konstrukte** stecken dahinter? → [Messtheorie & Konstrukte](/konzepte-konstrukte)
- Wie lassen sich diese Konstrukte in **messbare Items** übersetzen? → [Operationalisierung](/operationalisierung)
- Welche **Antwortformate** eignen sich? → [Antworttypen](/fragetypen)

Wenn ihr bei der Operationalisierung merkt, dass eine Forschungsfrage nicht sinnvoll in Fragebogenfragen übersetzbar ist, geht zurück und überarbeitet die Forschungsfrage. Das ist kein Scheitern, sondern Teil des Prozesses.

---

### Kapitel: Messtheorie & Konstrukte

Viele Dinge, die euch in einer Umfrage interessieren, lassen sich nicht direkt beobachten: Zufriedenheit, Motivation, Kompetenz, Zugehörigkeitsgefühl. In der Sozialforschung spricht man hier auch von **latenten Variablen**, also Größen, die nicht direkt messbar sind, sondern nur indirekt über beobachtbare Hinweise (Indikatoren) erschlossen werden können. Im Gegensatz dazu stehen **manifeste Variablen** wie Alter, Postleitzahl oder Anzahl der Besuche, die direkt abgefragt werden können.

Um latente Variablen per Fragebogen zu erfassen, braucht ihr ein Grundverständnis davon, wie Messung in Umfragen funktioniert.

## Konstrukte, Dimensionen und Indikatoren

### Konstrukt

Ein **Konstrukt** ist ein theoretisch definiertes, nicht direkt beobachtbares Phänomen, das ihr messen wollt. Es geht über eine vage Alltagsidee hinaus: Wenn ihr „Zufriedenheit" genauer definiert, z.B. als *die subjektive Bewertung der Passung zwischen Erwartungen und Erfahrungen*, habt ihr ein Konstrukt. Es beschreibt präzise, was ihr messen wollt und grenzt es von verwandten Phänomenen ab.

### Dimension

Die meisten Konstrukte sind mehrdimensional, sie bestehen aus mehreren Teilaspekten. Diese **Dimensionen** zu identifizieren ist ein wichtiger Zwischenschritt, weil er bestimmt, welche Bereiche euer Fragebogen abdecken muss. Das Konstrukt „Zufriedenheit mit einem Workshop" könnte z.B. die Dimensionen *inhaltliche Qualität*, *Organisation/Ablauf*, *Atmosphäre* und *Praxisrelevanz* umfassen.

### Indikator

Ein **Indikator** ist ein beobachtbarer Hinweis auf eine Dimension eines Konstrukts, also etwas, das ihr tatsächlich abfragen könnt. Für die Dimension „inhaltliche Qualität" könnte ein Indikator sein: *Zustimmung zur Aussage „Die behandelten Themen waren für meine Arbeit relevant."*

Die Kette sieht also so aus:

**Konstrukt** (präzise Definition) → **Dimensionen** (Teilaspekte) → **Indikatoren** (messbare Fragen)

> **Praxisbeispiel:**
> Eine Umweltschutzorganisation möchte das „Engagement" ihrer Freiwilligen messen. Aber was ist Engagement? Ist es die Häufigkeit der Teilnahme? Die emotionale Verbundenheit? Die Bereitschaft, neue Aufgaben zu übernehmen?
> 
> Wenn das nicht vorab geklärt wird, entsteht ein Fragebogen mit Fragen, die verschiedene Aspekte von „Engagement" vermischen, und am Ende weiß man nicht, was die Ergebnisse aussagen.
> 
> Eine saubere Vorgehensweise: Das Konstrukt „Engagement" wird in zwei Dimensionen aufgeteilt: **Verhaltensengagement** (beobachtbare Aktivitäten wie Häufigkeit der Teilnahme, übernommene Aufgaben) und **affektives Engagement** (emotionale Bindung, Identifikation mit der Organisation). Für jede Dimension werden dann eigene Indikatoren entwickelt. So können die Ergebnisse getrennt ausgewertet werden. Vielleicht sind die Freiwilligen emotional stark verbunden, aber können zeitlich weniger einbringen.

## Warum das wichtig ist

### Klarheit bei der Auswertung

Wenn ihr wisst, welches Konstrukt eine Frage misst, könnt ihr die Ergebnisse sinnvoll interpretieren. Ohne diese Zuordnung bleibt unklar, was eine Zahl eigentlich bedeutet.

### Vermeidung von Fehlinterpretation

Wenn eine einzelne Frage ein vielschichtiges Konstrukt abbilden soll, sind die Ergebnisse mehrdeutig. Eine hohe Zustimmung zur Aussage *„Ich bin zufrieden"* kann vieles bedeuten, und ohne Konstruktdefinition wisst ihr nicht, was genau.

### Grundlage für die Operationalisierung

Die Konstruktdefinition ist die direkte Vorstufe zur [Operationalisierung](/operationalisierung): Erst wenn ihr wisst, was ihr messen wollt (Konstrukt), könnt ihr entscheiden, wie ihr es messen wollt (Items).

## Gütekriterien: Validität und Reliabilität

Validität und Reliabilität sind eine Dimension der [**Belastbarkeit**](/handeln-einleitung#wie-belastbar-sind-eure-daten) eurer Erkenntnisse. Zwei zentrale Fragen solltet ihr im Hinterkopf behalten:

### Validität: Messen wir das Richtige?

Eine Messung ist **valide**, wenn sie tatsächlich das misst, was sie messen soll. Wenn ihr „Zufriedenheit mit dem Angebot" messen wollt, aber eure Fragen eigentlich die allgemeine Stimmung am Tag der Befragung erfassen, dann ist die Messung nicht valide.

Für die Praxis heißt das: Überlegt bei jeder Frage, ob die Antworten wirklich Rückschlüsse auf euer Konstrukt zulassen, oder ob sie auch durch andere Faktoren erklärt werden können.

### Reliabilität: Messen wir zuverlässig?

Eine Messung ist **reliabel**, wenn sie bei Wiederholung unter gleichen Bedingungen ähnliche Ergebnisse liefert. Unreliabel wäre z.B. eine Frage, die so unklar formuliert ist, dass dieselbe Person sie je nach Tagesform unterschiedlich versteht.

In der NPO-Praxis verbessert ihr die Reliabilität vor allem durch klare, eindeutige Formulierungen und durch [Pretesting](/pretesting) des Fragebogens.

## Von der Theorie zur Praxis

Die Messtheorie klingt vielleicht abstrakt, aber die praktische Konsequenz ist einfach: **Definiert vor dem Fragebogendesign, was genau ihr messen wollt.** Schreibt für jedes Konstrukt eine kurze Definition auf. Ein bis zwei Sätze reichen. Das hilft euch:

1. Bei der [Operationalisierung](/operationalisierung) die richtigen Indikatoren zu finden
2. Bei der Auswertung zu wissen, was die Zahlen bedeuten
3. Bei der Kommunikation der Ergebnisse präzise zu sein

Dieser Schritt wird oft übersprungen, weil er „theoretisch" wirkt, aber er spart euch erheblich Arbeit in den späteren Phasen.

---

### Kapitel: Operationalisierung

Operationalisierung bedeutet, ein theoretisches Konzept so in konkrete Fragebogenitems zu übersetzen, dass die Antworten das Konzept tatsächlich abbilden. Dabei geht es nicht nur um die Formulierung einzelner Fragen, sondern um eine vorgelagerte Entscheidung: Was genau will ich messen, und welche beobachtbaren Indikatoren eignen sich dafür?
 
Viele Fragebogenprobleme, die auf den ersten Blick wie Formulierungsfehler aussehen, sind im Kern Operationalisierungsprobleme. Die Frage ist nicht schlecht *formuliert*, es ist unklar, was sie *messen* soll.
 
## Vom Konstrukt zum Item

Ein Item ist die konkrete einzelne Interaktion der Teilnehmer:innen mit eurem Fragebogen, also eine einzelne Frage oder Aussage, die beantwortet wird oder zu der Stellung bezogen werden soll. Mehrere Items können eine Frage oder ein Konstrukt erfassen. Der Weg vom Konstrukt zum Item folgt einer klaren Logik:

1. **Konstrukt definieren**: Was genau wollt ihr messen? (→ [Messtheorie & Konstrukte](/konzepte-konstrukte))
2. **Dimensionen identifizieren**: Aus welchen Teilaspekten besteht das Konstrukt? Zufriedenheit kann z.B. die Dimensionen Inhalt, Organisation und Atmosphäre umfassen.
3. **Indikatoren festlegen**: Welche beobachtbaren Merkmale zeigen an, ob eine Dimension hoch oder niedrig ausgeprägt ist?
4. **Items und Fragen formulieren**: Wie fragt ihr nach den Indikatoren, z.B. als Bewertung, als Häufigkeit, als Zustimmung zu einer Aussage? (→ [Fragen formulieren](/fragen-formulieren))
5. **Antwortformat wählen**: Welche Skala oder welches Format passt? (→ [Antworttypen](/fragetypen))

> **Praxisbeispiel:**
> Konstrukt: *Wahrgenommene Wirksamkeit eines Beratungsangebots*
> 
> Dimension 1, Wissenszuwachs:
> - Indikator: Subjektive Einschätzung des Lerneffekts
> - Item: *„Durch die Beratung habe ich neue Handlungsmöglichkeiten kennengelernt."* (Likert-Skala)
> 
> Dimension 2, Handlungsfähigkeit:
> - Indikator: Konkrete Umsetzungsschritte
> - Item: *„Nach der Beratung wusste ich, welche konkreten Schritte ich als Nächstes unternehmen kann."* (Likert-Skala)
> 
> Durch diese Zerlegung wird aus dem vagen Wunsch, „die Wirkung zu messen", ein konkreter Fragebogenabschnitt mit interpretierbaren Ergebnissen.

### Vorhandene Skalen nutzen

Für viele Konstrukte existieren bereits erprobte und validierte Fragebogenskalen aus der Forschung. Bevor ihr eigene Items entwickelt, prüft, ob es passende Instrumente gibt. Vorteile:

- Die Items sind bereits auf Verständlichkeit und Messgenauigkeit getestet
- Eure Ergebnisse lassen sich mit anderen Studien vergleichen
- Ihr spart euch Entwicklungsaufwand

Allerdings: Viele wissenschaftliche Skalen sind für den NPO-Kontext zu lang oder zu abstrakt. Es ist legitim, Skalen zu kürzen oder anzupassen. Dokumentiert aber, was ihr verändert habt, damit die Ergebnisse eingeordnet werden können.

## Typische Fehler

### Konstrukt nicht definiert

Ohne eine klare Konstruktdefinition formuliert ihr Items ins Blaue. Das Ergebnis: Fragen, die „irgendwie" zum Thema passen, aber nicht systematisch ein Konstrukt abbilden.

### Zu wenig Indikatoren

Ein einzelnes Item pro Konstrukt ist riskant: Wenn die Frage missverstanden wird oder unglücklich formuliert ist, habt ihr keine Möglichkeit, das in der Auswertung zu erkennen. Mindestens zwei bis drei Items pro Konstrukt erhöhen die Messgenauigkeit.

### Indikatoren und Konstrukt verwechselt

Manchmal wird ein Indikator mit dem Konstrukt gleichgesetzt. *„Wie oft besuchen Sie unsere Veranstaltungen?"* misst Besuchshäufigkeit. Das ist ein möglicher Indikator für Engagement, aber nicht dasselbe wie Engagement.

> **Praxisbeispiel:**
> Die Frage *„Würden Sie Ihre Erfahrungen oder Ihr Wissen mit anderen Organisationen teilen und sich mit anderen Organisationen austauschen?"* lässt auf ein Operationalisierungsproblem schließen: Das eigentliche Konzept  (*Relevanz bestimmter Austauschformate*) ist in der Frage nicht erkennbar. Stattdessen wird pauschal nach Austauschbereitschaft gefragt. Die Frage ist zudem suggestiv: Wissen und Erfahrungen zu teilen ist sozial erwünscht, kaum eine Organisation würde hier offen mit Nein antworten. Auch wenn alle Befragten zustimmen, weiß man nicht, was dieses Ja bedeutet.
>  
> Eine saubere Operationalisierung beginnt mit dem Konzept und fragt: Welche beobachtbaren Indikatoren bilden es ab? Wenn das Konzept *Relevanz bestimmter Austauschformate* ist, benötigt man keine Ja/Nein-Frage zur allgemeinen Bereitschaft, sondern eine Frage, die konkrete Formate zur Auswahl stellt. Deshalb wurde die Multiple-Choice-Frage *„Welche dieser Formate des Austauschs mit anderen Organisationen sind für Sie grundsätzlich relevant?"* gewählt. So wird statt einer hypothetischen Bereitschaft die konkrete Relevanz einzelner Formate erfragt, und die Antworten sind direkt interpretierbar.

---

### Kapitel: Fragebogenaufbau

Die Reihenfolge der Fragen und ihre logische Verknüpfung beeinflussen, wie Teilnehmer:innen antworten – und damit die Qualität eurer Daten. Ein guter Fragebogen führt die Befragten klar durch das Thema und vermeidet, dass die Struktur selbst zu Verzerrungen führt.

## Grundstruktur

Ein typischer Fragebogen folgt einem klaren Aufbau, manchmal auch "Dramaturgie" (Porst, 2014) genannt:

1. **Einleitung/Titelseite**: Zweck der Befragung, Datenschutz, geschätzte Dauer. Die Einleitung sollte "Werbewirksamkeit" (Porst, 2014) haben, um Aufmerksamkeit zu wecken und die Bereitschaft zum Ausfüllen zu erhöhen.
2. **Aufwärmfragen**: Einfache, niedrigschwellige, aber auch spannende Fragen zum Einstieg. Sie sollen die Teilnehmenden binden und Abbrüche verhindern.
3. **Hauptteil**: Kernfragen, thematisch gruppiert und logisch geordnet.
4. **Sensible Fragen**: Heikle oder persönliche Themen erst, wenn Vertrauen auf
5. **Soziodemografie**: Alter, Geschlecht etc. meist am Ende.
6. **Abschluss/letzte Seite**: Ein Dankeschön und die Möglichkeit, sich in einem offenen Format zur Umfrage zu äußern.

## Antwortverzerrungen

Position und Formulierung von Fragen können das Antwortverhalten systematisch beeinflussen. Solche Verzerrungen lassen sich nicht vollständig vermeiden, aber durch bewussten Aufbau reduzieren.

### Ermüdungseffekte

Mit zunehmender Länge sinkt die Antwortqualität: Teilnehmer:innen klicken schneller, weniger differenziert oder brechen ab. Wichtige Fragen daher nicht ans Ende stellen und die Gesamtlänge realistisch halten.

### Reihenfolgeeffekte

Die Position einer Frage beeinflusst, wie sie beantwortet wird. In Befragungen ziehen Teilnehmer:innen frühere Fragen und Antworten heran, um spätere zu interpretieren und zu beantworten. Dies hat kognitive und normative Ursachen (vgl. Dillman et al. (2014)):

**Kognitive Ursachen:**

- **Priming**: Frühere Fragen aktivieren bestimmte Inhalte, die beim Beantworten späterer Fragen leichter abrufbar sind. 
- **Carryover**: Frühere Bewertungen werden in spätere übertragen.
- **Anchoring**: Eine erste Frage setzt einen Maßstab. Das kann zu Assimilation *oder* Kontrast führen – je nachdem, ob Befragte Ähnlichkeiten oder Unterschiede zwischen den Themen wahrnehmen. 
- **Subtraction**: Argumente, die für die erste Antwort genutzt wurden, werden bei der zweiten ausgeklammert.

**Normative Ursachen:**

- **Fairness/Evenhandedness**: Wer eine Gruppe streng beurteilt hat, wendet denselben Maßstab auch auf andere an.
- **Konsistenz**: Befragte wollen konsistent erscheinen und passen spätere Antworten an frühere an.

> **Praxisbeispiel:**
> Ein klassisches Beispiel stammt aus einer Studie, in der Reihenfolgeeffekte erstmals systematisch beobachtet wurden:
> 
> > [Hyman und Sheatsley stellten] einer Reihe Personen die Frage, ob es einem kommunistischen Reporter gestattet sein sollte, über seinen Besuch in den Vereinigten Staaten zu berichten. Platzierten sie einen entsprechenden Indikator, nachdem Auskunft darüber eingeholt wurde, ob es denn einem amerikanischen Reporter erlaubt sein sollte, über die Sowjetunion zu berichten, so antworteten 73 Prozent der Befragten mit Ja. Wurde die Fragereihenfolge jedoch verändert, so betrug die Zustimmung nur noch 37 Prozent. (Häder & Kühne, 2009)
> 
> Wurde also zuerst nach dem amerikanischen Reporter gefragt, fühlten sich die Befragten offenbar einer gewissen Konsistenz verpflichtet: Wer dem US-Reporter Berichterstattung zugestand, konnte sie dem sowjetischen schlecht verweigern.

#### Was ihr beachten solltet

**Generelle** Fragen gehören meist vor **spezifische**, und **thematisch zusammenhängende** Fragen sollten **gebündelt** werden; aber nicht so, dass eine Frage die nächste inhaltlich vorwegnimmt.

## Filterführung

Filterführung sorgt dafür, dass Teilnehmer:innen nur die Fragen sehen, die für sie relevant sind. Das verkürzt den Fragebogen, erhöht die Datenqualität und vermeidet Frust. Eine Filterfrage entscheidet, welche Folgefragen angezeigt werden.

> **Praxisbeispiel:**
> Man möchte erfassen, ob Organisationen Auswirkungen des Inkrafttretens eines Gesetzes beobachten. Bevor man fragt, ob dies der Fall ist, sollte man zunächst filtern, ob die Organisationen dieses Gesetz überhaupt kennen. Sonst beantworten alle Befragten eine für sie irrelevante Frage.

---

### Kapitel: Fragen formulieren

Eine sehr gute Anleitung des Ministeriums für Digitales mit den häufigsten Fehlern beim Formulieren von Fragen und Beispielen wie man es besser machen kann findet ihr in den [Servicestandards](https://servicestandard.gov.de/handbuch/anleitungen/formulare-mit-verstaendlichen-fragen-gestalten/).

Als generelle Regeln gelten bei der Formulierung von Fragebogenfragen nach Porst et al. (2019) folgende Punkte:

1. **Einfache, unzweideutige Begriffe verwenden**, die von allen Befragten gleich verstanden werden. Was „einfach" bedeutet, hängt stark von der Zielgruppe ab.
2. **Kurze, einfache Fragen formulieren.** Lange Fragen verwirren und enthalten oft überflüssige Informationen.
3. **Keine hypothetischen Fragen stellen.** Befragte können sich oft nicht zuverlässig in Situationen versetzen, in denen sie nicht sind.
4. **Doppelte Stimuli und Verneinungen vermeiden.** Eine Frage sollte immer nur einen Sachverhalt abfragen.
5. **Keine Unterstellungen oder suggestive Formulierungen.** Diese schränken den Antwortspielraum der Befragten ein.
6. **Keine Fragen zu Informationen, über die Befragte mutmaßlich nicht verfügen.** Fehlendes Wissen senkt die Motivation und verschlechtert die Datenqualität.
7. **Eindeutigen zeitlichen Bezug herstellen.** Vage Zeitangaben wie „in den letzten Wochen" sind zu vermeiden; konkrete Anker wie „im September 2018" sind besser.
8. **Antwortkategorien erschöpfend und disjunkt gestalten.** Jede Person muss sich eindeutig einer Kategorie zuordnen können.
9. **Kontexteffekte kontrollieren.** Vorherige Fragen können die Beantwortung späterer Fragen beeinflussen. Dies lässt sich am besten durch Pretests prüfen.
10. **Unklare Begriffe definieren.** Wenn Vereinfachung nicht möglich ist, sollten Fachbegriffe erklärt werden.

Bei der Frageformulierung spielt auch das [Antwortformat](/fragetypen) eine Rolle: Offene Fragen ohne vorgegebene Antworten müssen möglicherweise genauer formuliert werden als geschlossene Fragen, da vorgegebene Antwortoptionen zum Kontext beitragen und somit das Verständnis erleichern (Porst, 2014).

> **Praxisbeispiel:**
> Die Frage *„Wie gut arbeitet Ihre Organisation im Moment mit der Stadt oder dem Landkreis zusammen?"* ist ein klassischer **doppelter Stimulus** (Regel 4): Sie fragt gleichzeitig, *ob* eine Zusammenarbeit stattfindet, und *wie gut* diese läuft. Das Problem zeigt sich an den Antwortoptionen — neben einer Bewertungsskala (z.B. „eher gut") bräuchte man zusätzlich die Option „es gibt keine Zusammenarbeit", was die Skala sprengt.
> 
> Besser wäre eine vorgelagerte Filterfrage (*„Arbeitet Ihre Organisation mit der Stadt oder dem Landkreis zusammen?"*). Nur bei Ja folgt dann die Folgefrage zur Qualität der Zusammenarbeit.

---

### Kapitel: Antworttypen

Der grundlegendste Unterschied beim Umfragedesign besteht zwischen **geschlossenen Fragen**, 
bei denen die Befragten aus vordefinierten Optionen auswählen, und **offenen Fragen**, bei 
denen sie frei in eigenen Worten antworten. Beide dienen unterschiedlichen Erkenntniszielen 
und sind mit spezifischen Tradeoffs verbunden.

Geschlossene Fragen sind kognitiv weniger anspruchsvoll und für Befragte, insbesondere in 
Online-Umfragen, einfacher zu beantworten, da sie lediglich einen Tastendruck oder Mausklick 
erfordern. Allerdings können vorgegebene Antwortoptionen den Teilnehmenden implizit 
signalisieren, welche Antworten als vernünftig oder erwünscht gelten, und dadurch die Antworten 
in eine bestimmte Richtung lenken. Offene Fragen umgehen diesen Effekt, bringen jedoch eigene 
Herausforderungen hinsichtlich Datenqualität, Vollständigkeit und Analyseaufwand mit sich 
(Connor Desai & Reimers, 2019). 

Offene Fragen sind das zentrale Instrument der qualitativen Forschungstradition in den 
Sozialwissenschaften. In dieser Wissenssammlung wird jedoch vorrangig ein quantitativer Ansatz verfolgt; offene Fragen werden daher vor allem als Ergänzung zu geschlossenen Formaten behandelt.

Eine weitere Unterscheidung betrifft den Unterschied zwischen einzelnen Fragen und 
Fragebatterien: Werden mehrere thematisch zusammenhängende Fragen als Gruppe eingesetzt, 
spricht man üblicherweise von **Items**. Dieser Begriff ist in der deutschsprachigen 
Methodenliteratur etabliert und wird im Folgenden entsprechend verwendet.

Für alle nachfolgend beschriebenen Fragetypen werden exemplarisch Umsetzungsmöglichkeiten 
in xlsform und DDI Codebook, sowie Darstellungsmöglichkeiten in zwei gängigen Umfragetools 
vorgestellt.

## Geschlossene Fragetypen

### 1. Single Choice

Bei Single-Choice-Fragen wählt die befragte Person genau eine Option aus einer vorgegebenen, abgeschlossenen Liste aus.

#### Wann sollte Single Choice verwendet werden?

Single Choice eignet sich, wenn die Antwortkategorien **erschöpfend und trennscharf** formuliert werden können, d. h. alle relevanten Ausprägungen des Merkmals abdecken, ohne sich zu überschneiden (z. B. Altersgruppen, Bildungsabschluss, Beschäftigungsstatus), (Holbrook & Lavrakas, 2008) 

#### Layout für wenige Antwortoptionen

Bei Fragen mit einer einzigen Antwortmöglichkeit sollten in den meisten Fällen vertikale Radio Buttons verwendet werden. In Kobo Toolbox und in Lime Survey ist die vertikale Darstellung Standard. 

**XLSForm survey:**
```
type                    | name         | label                                  
----------------------- | ------------ | ---------------------------------------
select_one bildungsgrad | bildungsgrad | Was ist Ihr höchster Bildungsabschluss?
```

**XLSForm choices:**
```
list_name    | name | label                          
------------ | ---- | -------------------------------
bildungsgrad | 1    | Kein Abschluss                 
bildungsgrad | 2    | Haupt- oder Realschulabschluss 
bildungsgrad | 3    | Fachhochschulreife / Abitur    
bildungsgrad | 4    | Abgeschlossene Berufsausbildung
bildungsgrad | 5    | Hochschulabschluss             
```

#### Layout für viele Antwortoptionen (Single Choice)

Das Layout für lange Auswahllisten sollte anders sein als bei kurzen Listen: 100 Radio Buttons überladen das gesamte Umfrage-Layout.

Eine Option sind **Dropdowns**, durch die die Nutzer:in zu der Antwortoption scrollen kann. Bei langen Listen im Web/auf dem Desktop (wie z. B. Ländern oder Berufen) kann ein Dropdown geeignet sein, um Platz auf dem Bildschirm zu sparen. Dropdowns können jedoch bei sehr langen Listen (z. B. 100+ Optionen) ebenfalls unübersichtlich sein. Experimentelle Studien zeigen, dass ein Autocomplete-Feld (bei dem Befragte die ersten Buchstaben eingeben und passende Optionen gefiltert angezeigt werden) bei langen Listen mehr verwertbare Antworten liefert als ein einfaches Textfeld und schneller ist als ein klassisches Dropdown [Citation].

Bei Autocomplete ist jedoch zu beachten, dass sich die kognitive Aufgabe verändert: Während geschlossene Fragen mit sichtbarer Optionsliste einer Wiedererkennungsaufgabe (Recognition) ähneln, funktionieren offene Eingabeformate eher wie Aufgaben des freien Abrufs (Recall), die auf kontrollierten Gedächtnisprozessen basieren. Empirische Befunde legen nahe, dass offene und geschlossene Antwortformate auf unterschiedlichen kognitiven und mnestischen Prozessen beruhen und daher zu unterschiedlichen Ergebnissen führen können [Citation]. Autocomplete eignet sich daher vor allem für Fragen, bei denen die Befragten die Antwort bereits kennen (z. B. das eigene Herkunftsland oder eingenommene Medikamente), weniger für Fragen, bei denen Optionen erst durch Ansehen der Liste erkannt werden (z. B. „Welche dieser Marken kennen Sie?").

Kobo Toolbox erlaubt für Single Choice eine Autocomplete-Option, während bei LimeSurvey nur ein Dropdown möglich ist. Über die `appearance`-Spalte in XLSForm kann die Darstellung über den Wert `minimal` zu einem Dropdown geändert werden. 

Beim Fragebogendesign bietet es sich an viele Antwortoptionen über eine seperate Datei oder in einem separaten Sheet, dass dann über eine Formel eingebunden wird, abzubilden. 

In DDI Codebook führen wir die Konvention ein, über den `concept`tag ein vocabular zu referenzieren.

**XLSForm survey:**
```
type                                | name        | label                              
----------------------------------- | ----------- | -----------------------------------
select_one_from_file iso_3166_1.csv | geburtsland | In welchem Land wurden Sie geboren?
```

### 2. Multiple-Choice

Bei Multiple-Choice-Fragen können Befragte alle zutreffenden Optionen auswählen. Jede Option wird als eigene binäre Variable kodiert 
(0 = nicht genannt, 1 = genannt). Strukturell entspricht eine Multiple-Choicefrage einer Batterie aus ebenso vielen Ja/Nein-Fragen, wie Antwortoptionen vorhanden sind.

#### Wann sollte Multiple Choice verwendet werden?

Single Choice ist das methodisch robustere Antwortformat [Citation]. Multiple Choice sollte nur verwendet werden, wenn Antwortoptionen sich **nicht** gegenseitig ausschließen (z.B. genutzte Medien, gesprochene Sprachen oder berufliche Tätigkeitsfelder).

#### Layout für wenige Antwortoptionen

Hier gilt das gleiche wie bei Single Choice.

**XLSForm survey:**
```
type                          | name       | label                                                
----------------------------- | ---------- | -----------------------------------------------------
select_multiple wochenendtage | wochenende | An welchen Tagen des Wochenendes sind Sie erreichbar?
```

**XLSForm choices:**
```
list_name     | name | label  
------------- | ---- | -------
wochenendtage | sa   | Samstag
wochenendtage | so   | Sonntag
```

#### Layout für viele Antwortoptionen

Die Probleme von Dropdowns und vielen Radio Buttons sind ähnlich zu Single Choice, verschärfen sich hier jedoch: sie können dazu führen, dass nur bestimmte oder nicht alle relevanten Optionen ausgewählt werden. Es gibt weder in Kobo Toolbox, noch in Lime Survey gibt es gute und einfach umsetzbare Alternativen. Kobo Toolbox erlaubt einen Mutiple Choice Dropdown, aber kein Multiple Choice Autocomplete. Lime Survey erlaubt beides nicht für Mutiple Choice, es gibt jedoch ein Question Theme, das autocomplete für Multiple Choice ermöglicht.

In Limesurvey gibt es die option das dropdown fpr multiple chocie zu nehmen, oder ein repoeat vom autocompomplet zu nutzen. Leider ist letzteres eher führ mehrer fragen in einer sich wiederholdenden Gruppe gedacht, sodass die Wiederholungen bei vielen ausgewählten Optionen schnell zu viel Platz wegnehmen.

**XLSForm survey:**
```
type                                     | name             | label                                                                     
---------------------------------------- | ---------------- | --------------------------------------------------------------------------
select_multiple_from_file iso_3166_1.csv | besuchte_laender | Welche dieser Länder haben Sie bereits besucht? Mehrere Antworten möglich.
```

## Halb-Offene Antwortformate

Halb-offene Antwortformate nehmen eine Zwischenposition zwischen vollständig geschlossenen und vollständig offenen Frageformaten ein [Citation]. Sie stellen eine vordefinierte, geschlossene Antwortliste bereit (Single oder Multiple Choice) und ergänzen diese um ein optionales Freitextfeld — typischerweise gelabeled als „Sonstiges (bitte angeben)". Dadurch entstehen zwei verschiedene Datentypen innerhalb einer Frage: kategoriale, quantitativ auswertbare Antworten aus der geschlossenen Liste sowie Freitexteingaben, die qualitativ aufbereitet und gesondert analysiert werden müssen.

Der konzeptionelle Vorteil dieses Formats — Erschöpfungsgrad ohne vollständige Offenheit — ist in der Praxis jedoch begrenzt: Befragte nutzen die „Sonstiges"-Option selten und interpretieren die vorgelegte Liste als vollständig, selbst wenn ihre tatsächliche Antwort außerhalb der Kategorien läge [Citation].

Das „Sonstiges"-Feld sollte stets am Ende der Antwortkategorien platziert werden, um Primacy-Effekte zu vermeiden. 

Themen, die wiederholt genannt werden, deuten auf eine Lücke im Kategoriensystem hin und sollten in künftigen Erhebungen als eigenständige Kategorien aufgenommen werden [Citation].

### 1. Single Choice mit „Sonstiges"-Antwortmöglichkeit

Bei Single-Choice-Fragen ist ein „Sonstiges (bitte angeben)"-Feld nur dann gerechtfertigt, wenn das erhobene Merkmal einen offenen Wertebereich hat, der sich nicht vollständig vorspezifizieren lässt — etwa Geschlecht, Berufsbezeichnung oder Religionszugehörigkeit. Bei Merkmalen mit klar begrenztem Wertebereich (z. B. Altersgruppe, Bildungsabschluss, Beschäftigungsstatus) sollte auf das Feld verzichtet werden, da die Kategorien so formuliert werden können, dass sie erschöpfend und trennscharf sind (Holbrook & Lavrakas, 2008).

#### Layout

**XLSForm survey:**
```
type              | name             | label                                               | relevant               
----------------- | ---------------- | --------------------------------------------------- | -----------------------
select_one quelle | aufmerksam       | Wie sind Sie auf unser Angebot aufmerksam geworden? |                        
text              | aufmerksam_other | Sonstiges (bitte angeben)                           | $ = 'other'
```

**XLSForm choices:**
```
list_name | name           | label                 
--------- | -------------- | ----------------------
quelle    | suchmaschine   | Suchmaschine          
quelle    | empfehlung     | Persönliche Empfehlung
quelle    | soziale_medien | Soziale Medien        
quelle    | other          | Sonstiges             
```

### 2. Multiple Choice mit „Sonstiges"-Antwortmöglichkeit

Bei Multiple-Choice-Fragen ist ein „Sonstiges"-Feld häufiger gerechtfertigt, weil der Antwortraum — also die Menge aller möglichen Auswahlen — im Voraus schwerer vollständig zu antizipieren ist als bei Single-Choice-Fragen.

#### Layout

**XLSForm survey:**
```
type                    | name                | label                              | relevant                  
----------------------- | ------------------- | ---------------------------------- | --------------------------
select_multiple geraete | geraetebesitz       | Welche dieser Geräte besitzen Sie? |                           
text                    | geraetebesitz_other | Sonstiges (bitte angeben)          | $ = 'other'
```

**XLSForm choices:**
```
list_name | name       | label     
--------- | ---------- | ----------
geraete   | smartphone | Smartphone
geraete   | laptop     | Laptop    
geraete   | tablet     | Tablet    
geraete   | other      | Sonstiges 
```

## Geschlossene, gruppierte Antwortformate

### 1. Matrix / Likert-Skala (Grid)

Matrix-Fragen fassen mehrere Items zusammen, die dieselbe Antwortskala und denselben 
Einleitungstext teilen. In DDI 2.5 müssen die Antwortkategorien bei jedem Item wiederholt 
werden.

**XLSForm survey:**
```
type              | name                  | label                      | appearance
----------------- | --------------------- | -------------------------- | ----------
begin_group       | institutionsvertrauen | Vertrauen in Institutionen | table-list
select_one skala5 | vertrauen_parlament   | Das Parlament              |           
select_one skala5 | vertrauen_polizei     | Die Polizei                |           
end_group         |                       |                            |           
```

**XLSForm choices:**
```
list_name | name | label      
--------- | ---- | -----------
skala5    | 1    | Gar nicht  
skala5    | 2    | 2          
skala5    | 3    | 3          
skala5    | 4    | 4          
skala5    | 5    | Vollständig
```

## Offene Antwortformate

### 1. Offene Zahl (Integer)

Offene numerische Fragen erfassen Zahlenwerte ohne vorgegebene Antwortkategorien — z.B. 
Alter, Haushaltsgröße oder Anzahl. 

Einfachauswahl mit vorgegebene Antwortkategorien (z.B. Intervalle) sind 
bei numerischen Fragen problematisch, weil Befragte die mittlere Kategorie als implizite 
Norm interpretieren und ihre Antwort entsprechend anpassen — ein Effekt, der in 
Online-Befragungen auch außerhalb sensitiver Themen nachweisbar ist (Baur et al., 2014).  Weiterhin: Vage Quantoren wie „manchmal", „häufig" oder „selten" werden von verschiedenen Befragten sehr unterschiedlich interpretiert und erzeugen dadurch systematische Messfehler.(Krosnick et al., 2018).  Für numerische Fragen — etwa zur Häufigkeit eines Verhaltens — empfiehlt sich daher grundsätzlich die direkte Abfrage eines konkreten Wertes anstelle vorgegebener Kategorien. 

**XLSForm survey:**
```
type    | name  | label            
------- | ----- | -----------------
integer | alter | Wie alt sind Sie?
```

### 2. Offener Text

Freitextfragen ermöglichen den Befragten, eigene Antworten in Textform zu formulieren — 
z.B. für Kommentare oder offene Rückmeldungen.

#### Wann eignet sich eine offene Texteingabe?

Nach Züll et al. (2019) eignen sich die offene Texteingabe:

- Wenn der Befragungsgegenstand noch nicht eingegrenzt werden kann oder neue, 
  unerwartete Aspekte erwartet werden (explorative Fragebogenentwicklung)
- Wenn das Spektrum möglicher Antworten zu groß für vorgegebene Kategorien ist
- Wenn eine Lenkung des Befragten in Richtung vorgegebener Kategorien vermieden 
  werden soll — vorgegebene Antwortoptionen riskieren, Nennungen zu erzeugen, 
  die Präferenzen des Fragebogenentwicklers statt echte Meinungen widerspiegeln 
- Wenn Wissen abgefragt wird — offene Fragen minimieren die Wahrscheinlichkeit, 
  durch Raten eine richtige Antwort zu erzielen, und führen häufig zu reliableren 
  und valideren Angaben als geschlossene Fragen

**XLSForm survey:**
```
type | name        | label                         
---- | ----------- | ------------------------------
text | anmerkungen | Haben Sie weitere Anmerkungen?
```

## Weitere Empfehlungen für Antwortformate

### „Weiß nicht" und „Keine Angabe"

Eine explizite „Weiß nicht"-Option erhöht den Anteil fehlender Antworten, ohne die Reliabilität zu verbessern. Der Anstieg ist nur teilweise auf echte Meinungslosigkeit zurückzuführen — die Option wird auch als Satisficing-Strategie genutzt und kann suggerieren, dass Expertenwissen zur Beantwortung nötig sei. Ihr Einsatz ist daher kritisch zu sehen (Baur et al., 2014). 

**„Keine Angabe" / „Möchte ich nicht beantworten"** ist konzeptionell von „Weiß nicht" zu trennen: Hier wird nicht Unfähigkeit signalisiert, sondern bewusste Antwortverweigerung. Diese Option sollte bei sensiblen Themen angeboten werden — also bei Fragen, die soziale Erwünschtheit auslösen, als intrusiv empfunden werden oder bei denen Befragte negative Konsequenzen einer Offenlegung befürchten (Tourangeau & Yan, 2007). Typische Anwendungsbereiche sind Einkommen, Gesundheit, Sexualität und politische Zugehörigkeit. Wird bei solchen Fragen stattdessen eine Antwort erzwungen (Forced Answering), steigen die Abbruchquoten — insbesondere bei hochsensiblen Items — und die Antwortqualität sinkt (Décieux et al., 2015).

Bei **Multiple-Choice-Fragen** sollten "Weiß nicht" und "Keine Angabe" als exklusive Optionen implementiert werden: Sobald eine inhaltliche Option gewählt wird, ist eine gleichzeitige Angabe von „Weiß nicht" logisch widersprüchlich und sollte technisch unterbunden werden.

##  Nicht empfohlene Antwortformate

Schieberegler/Slider sollten zugunsten von Radio Buttons vermieden werden. Sie benötigen mehr Zeit zum Ausfüllen, führen zu mehr fehlenden Daten (Funke, 2016) und sind insbesondere auf Mobilgeräten problematisch (Antoun et al., 2017). Entscheidend ist, dass sie keine zuverlässigen kontinuierlichen Daten liefern, denn ein Schieberegler von 0 bis 100 täuscht Präzision nur vor. Radio Buttons sind schneller, besser zugänglich und funktionieren auf allen Geräten gleich.
