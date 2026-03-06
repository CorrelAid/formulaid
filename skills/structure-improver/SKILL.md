---
name: structure-improver
description: "Organize survey questions into a logical sequence. Group related topics and ensure smooth transitions."
metadata:
  version: "1.0.0"
  signature: "researchQuestion:string, questions:string -> reasoning:string, organizedQuestions:json"
---

# StructureImprover

Organize survey questions into a logical sequence. Group related topics and ensure smooth transitions.

## Interface

`researchQuestion:string, questions:string -> reasoning:string, organizedQuestions:json`

## Examples

### Example
**Input:**
```json
{
  "researchQuestion": "Sustainability habits",
  "questions": "[{\"label\": \"Do you recycle?\", \"name\": \"q2\"}, {\"label\": \"What is your name?\", \"name\": \"name\"}, {\"label\": \"How often do you buy organic?\", \"name\": \"q1\"}]"
}
```
**Output:**
```json
{
  "reasoning": "Standard demographic questions (name) should come first, followed by general habits, then specific frequency questions.",
  "organizedQuestions": [
    {
      "label": "What is your name?",
      "name": "name"
    },
    {
      "label": "Do you recycle?",
      "name": "q2"
    },
    {
      "label": "How often do you buy organic?",
      "name": "q1"
    }
  ]
}
```

