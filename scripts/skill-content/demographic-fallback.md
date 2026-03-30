
---

No results were fetched at build time (API may have been unreachable).

At runtime, fetch directly:

**Via MCP (preferred):**
```
qwacback:get_question "z4bm7lrn7mopedd"
qwacback:list_questions (study: "2z4e5jfgc6s6mwy")
```

**Via REST API (fallback):**
```
web_fetch https://qwacback.correlaid.org/api/questions/z4bm7lrn7mopedd
web_fetch https://qwacback.correlaid.org/api/studies/2z4e5jfgc6s6mwy/questions
web_fetch https://qwacback.correlaid.org/api/studies/2z4e5jfgc6s6mwy/xlsform
```
