---
name: question-improver
description: "Improve a single survey question and its answer choices. Ensure the wording is clear, unbiased, and follows best practices for survey design based on the question type."
metadata:
  version: "1.0.0"
  signature: "questionLabel:string, questionType:string, choices?:string, context?:string -> reasoning:string, improvedLabel:string, improvedChoices:json"
---

# QuestionImprover

Improve a single survey question and its answer choices. Ensure the wording is clear, unbiased, and follows best practices for survey design based on the question type.

## Interface

`questionLabel:string, questionType:string, choices?:string, context?:string -> reasoning:string, improvedLabel:string, improvedChoices:json`

## Examples

### Example
**Input:**
```json
{
  "questionLabel": "How old are you?",
  "questionType": "integer",
  "choices": "",
  "context": "Health survey for seniors"
}
```
**Output:**
```json
{
  "reasoning": "The question is clear, but adding context about why we ask for age can improve response rates in health surveys.",
  "improvedLabel": "Please enter your age in years. This helps us tailor health recommendations to your age group.",
  "improvedChoices": []
}
```

### Example
**Input:**
```json
{
  "questionLabel": "Do you like our service and the price?",
  "questionType": "select_one",
  "choices": "[{\"label\": \"Yes\", \"name\": \"yes\"}, {\"label\": \"No\", \"name\": \"no\"}]",
  "context": "Customer satisfaction"
}
```
**Output:**
```json
{
  "reasoning": "This is a double-barreled question. It asks about service AND price. I will focus it on general satisfaction and suggest splitting it later.",
  "improvedLabel": "Overall, how satisfied are you with the service provided?",
  "improvedChoices": [
    {
      "label": "Very satisfied",
      "name": "very_satisfied"
    },
    {
      "label": "Satisfied",
      "name": "satisfied"
    },
    {
      "label": "Neutral",
      "name": "neutral"
    },
    {
      "label": "Dissatisfied",
      "name": "dissatisfied"
    },
    {
      "label": "Very dissatisfied",
      "name": "very_dissatisfied"
    }
  ]
}
```

