import type { Survey } from './types.js';
import * as XLSX from 'xlsx';

export class XLSFormGenerator {
	generate(survey: Survey): Uint8Array {
		const surveyData = [['type', 'name', 'label', 'hint', 'required', 'relevant']];
		const choicesData = [['list_name', 'name', 'label', 'exclusive']];

		for (const q of survey.questions) {
			let rowType: string = q.type;
			const baseType = q.type.split(' ')[0];
			const embeddedList = q.type.split(' ')[1]; // e.g. "skala5" from "select_one skala5"
			if ((baseType === 'select_one' || baseType === 'select_multiple') && q.choices && q.choices.length > 0) {
				const listName = embeddedList ?? `${q.name}_list`;
				rowType = `${baseType} ${listName}`;
				for (const choice of q.choices) {
					choicesData.push([listName, choice.name, choice.label, (choice as any).exclusive ? 'yes' : '']);
				}
			}

			surveyData.push([
				rowType,
				q.name,
				q.label,
				q.hint || '',
				q.required ? 'yes' : 'no',
				(q as any).relevant ?? (q as any).relevance ?? ''
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
