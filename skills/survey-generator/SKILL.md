---
name: survey-generator
description: "Generate a comprehensive survey based on a research goal. Use the context questions as inspiration for style and formulation."
metadata:
  version: "1.0.0"
  signature: "researchQuestion:string, language:string, demographics?:string, contextQuestions?:string -> reasoning:string, generatedQuestions:json"
---

# SurveyGenerator

Generate a comprehensive survey based on a research goal. Use the context questions as inspiration for style and formulation.

## Interface

`researchQuestion:string, language:string, demographics?:string, contextQuestions?:string -> reasoning:string, generatedQuestions:json`

## Examples

### Example
**Input:**
```json
{
  "researchQuestion": "Employee satisfaction in remote teams",
  "language": "informal",
  "demographics": "department, years_of_experience",
  "contextQuestions": "[]"
}
```
**Output:**
```json
{
  "reasoning": "Focusing on communication, work-life balance, and tool adequacy for remote work.",
  "generatedQuestions": [
    {
      "id": "comm_1",
      "name": "comm_1",
      "label": "Wie zufrieden bist du mit der Kommunikation in deinem Team?",
      "type": "select_one",
      "required": true,
      "choices": [
        {
          "label": "Sehr zufrieden",
          "name": "5"
        },
        {
          "label": "Zufrieden",
          "name": "4"
        },
        {
          "label": "Neutral",
          "name": "3"
        },
        {
          "label": "Unzufrieden",
          "name": "2"
        },
        {
          "label": "Sehr unzufrieden",
          "name": "1"
        }
      ]
    },
    {
      "id": "tools_1",
      "name": "tools_1",
      "label": "Hast du alle Tools, die du für deine Arbeit im Homeoffice brauchst?",
      "type": "select_one",
      "required": true,
      "choices": [
        {
          "label": "Ja, voll und ganz",
          "name": "yes"
        },
        {
          "label": "Teilweise",
          "name": "partial"
        },
        {
          "label": "Nein",
          "name": "no"
        }
      ]
    }
  ]
}
```

