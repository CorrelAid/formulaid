import type { Survey } from './types.js';
import * as XLSX from 'xlsx';

const FALLBACK_SLUG = 'questionnaire';

/** ASCII slug of a title: German umlauts spelled out, everything else that is
 *  not a letter or digit collapsed to "_". */
export function slugify(title: string, maxLength = 40): string {
	const slug = title
		.toLowerCase()
		.replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c] ?? c)
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '_')
		.slice(0, maxLength)
		.replace(/^_+|_+$/g, '');
	return slug || FALLBACK_SLUG;
}

/** `form_id` for the settings sheet: the title slug plus a minute timestamp,
 *  so two forms generated from similar prompts don't collide on import (#22).
 *  Starts with a letter, as ODK requires. */
export function formIdFor(title: string, now = new Date()): string {
	const stamp = now.toISOString().slice(0, 16).replace(/[-:T]/g, '');
	const slug = slugify(title);
	return `${/^[a-z]/.test(slug) ? slug : `f_${slug}`}_${stamp}`;
}

/** Download filename for a survey. */
export function fileNameFor(survey: Survey): string {
	return `${slugify(survey.title)}.xlsx`;
}

export class XLSFormGenerator {
	generate(survey: Survey): Uint8Array {
		const surveyData = [['type', 'name', 'label', 'hint', 'required', 'relevant']];
		const choicesData = [['list_name', 'name', 'label', 'exclusive']];

		for (const q of survey.questions) {
			let rowType: string = q.type;
			const baseType = q.type.split(' ')[0];
			const embeddedList = q.type.split(' ')[1]; // e.g. "skala5" from "select_one skala5"
			if (
				(baseType === 'select_one' || baseType === 'select_multiple') &&
				q.choices &&
				q.choices.length > 0
			) {
				const listName = embeddedList ?? `${q.name}_list`;
				rowType = `${baseType} ${listName}`;
				for (const choice of q.choices) {
					choicesData.push([listName, choice.name, choice.label, choice.exclusive ? 'yes' : '']);
				}
			}

			surveyData.push([
				rowType,
				q.name,
				q.label,
				q.hint || '',
				q.required ? 'yes' : 'no',
				q.relevant ?? ''
			]);
		}

		const wb = XLSX.utils.book_new();
		const wsSurvey = XLSX.utils.aoa_to_sheet(surveyData);
		const wsChoices = XLSX.utils.aoa_to_sheet(choicesData);
		const wsSettings = XLSX.utils.aoa_to_sheet([
			['form_title', 'form_id'],
			[survey.title || 'Questionnaire', survey.formId ?? formIdFor(survey.title)]
		]);
		// Why each question is here, and where it came from (#5). Converters read
		// only survey/choices/settings, so an extra sheet travels along harmlessly.
		const explanationsData: string[][] = [['name', 'label', 'rationale', 'source']];
		for (const q of survey.questions) {
			explanationsData.push([q.name, q.label, q.rationale ?? '', q.source ?? '']);
		}
		if (survey.reasoning) {
			explanationsData.push([]);
			explanationsData.push(['_overall_reasoning', survey.reasoning]);
		}
		const wsExplanations = XLSX.utils.aoa_to_sheet(explanationsData);

		XLSX.utils.book_append_sheet(wb, wsSurvey, 'survey');
		XLSX.utils.book_append_sheet(wb, wsChoices, 'choices');
		XLSX.utils.book_append_sheet(wb, wsSettings, 'settings');
		XLSX.utils.book_append_sheet(wb, wsExplanations, 'explanations');

		// Generate buffer
		const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
		return new Uint8Array(buf);
	}
}
