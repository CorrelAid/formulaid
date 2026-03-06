import type { Survey } from './types.js';
import * as XLSX from 'xlsx';

export class XLSFormGenerator {
	generate(survey: Survey): Uint8Array {
		const surveyData = [['type', 'name', 'label', 'hint', 'required']];
		const choicesData = [['list_name', 'name', 'label']];

		for (const q of survey.questions) {
			let rowType: string = q.type;
			if ((q.type === 'select_one' || q.type === 'select_multiple') && q.choices && q.choices.length > 0) {
				const listName = `${q.name}_list`;
				rowType = `${q.type} ${listName}`;
				
				for (const choice of q.choices) {
					choicesData.push([listName, choice.name, choice.label]);
				}
			}

			surveyData.push([
				rowType,
				q.name,
				q.label,
				q.hint || '',
				q.required ? 'yes' : 'no'
			]);
		}

		const wb = XLSX.utils.book_new();
		const wsSurvey = XLSX.utils.aoa_to_sheet(surveyData);
		const wsChoices = XLSX.utils.aoa_to_sheet(choicesData);
		const wsSettings = XLSX.utils.aoa_to_sheet([
			['form_title', 'form_id'],
			['Generated Questionnaire', 'generated_form']
		]);
		
		XLSX.utils.book_append_sheet(wb, wsSurvey, 'survey');
		XLSX.utils.book_append_sheet(wb, wsChoices, 'choices');
		XLSX.utils.book_append_sheet(wb, wsSettings, 'settings');

		// Generate buffer
		const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
		return new Uint8Array(buf);
	}
}
