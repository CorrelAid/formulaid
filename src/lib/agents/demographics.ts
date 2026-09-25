import { demographicVariables, type DemographicVariable } from '../constants.js';
import type { Choice, Question, QuestionType } from './types.js';

function mapToQuestionType(type: string): QuestionType {
	if (!type) return 'text';
	const t = type.toLowerCase();
	if (t.includes('single') || t.includes('one') || t === 'select_one') return 'select_one';
	if (t.includes('multiple')) return 'select_multiple';
	if (t.includes('number') || t.includes('integer')) return 'integer';
	if (t.includes('date')) return 'date';
	return 'text';
}

/** Codes 1..n, in the order the standard lists the answers. `choice_0` etc.
 *  were truncated to the 5-character limit and came out as choic/choi1 (#28). */
function parseChoices(optionsText: string): Choice[] {
	if (!optionsText) return [];
	return optionsText
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean)
		.map((label, i) => ({ name: String(i + 1), label }));
}

export function demographicQuestion(v: DemographicVariable): Question {
	return {
		id: v.question_id,
		name: v.question_name,
		label: v.question_text,
		type: mapToQuestionType(v.question_type),
		choices: parseChoices(v.answer_options_text),
		required: true
	};
}

/** The selected demographic standards as questions, in the order of the list. */
export function demographicQuestions(selected: string[]): Question[] {
	return demographicVariables
		.filter((v) => selected.includes(v.question_name))
		.map(demographicQuestion);
}
