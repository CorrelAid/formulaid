/** Wizard inputs kept across reloads (#23). None of this is secret; the API
 *  key has its own handling in storage.ts. */
export interface WizardInputs {
	researchQuestions: string[];
	targetGroup: string;
	useOfResults: string;
	language: 'formal' | 'informal' | null;
	selectedDemographics: string[];
}

const STORAGE_KEY = 'formulaid_wizard_inputs';

/** Saved inputs, or null when there are none (or storage is unavailable, e.g.
 *  in a private window). Fields with the wrong shape are dropped. */
export function loadWizardInputs(): Partial<WizardInputs> | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const data = JSON.parse(raw) as Record<string, unknown>;
		const inputs: Partial<WizardInputs> = {};
		for (const key of ['targetGroup', 'useOfResults'] as const) {
			if (typeof data[key] === 'string') inputs[key] = data[key];
		}
		if (isStringList(data.researchQuestions)) {
			inputs.researchQuestions = data.researchQuestions;
		} else if (typeof data.researchQuestion === 'string') {
			// Before #34 there was one field, with one question per line.
			const lines = data.researchQuestion.split('\n').map((l) => l.trim());
			inputs.researchQuestions = lines.filter(Boolean).length ? lines.filter(Boolean) : [''];
		}
		if (data.language === 'formal' || data.language === 'informal' || data.language === null) {
			inputs.language = data.language;
		}
		if (isStringList(data.selectedDemographics)) {
			inputs.selectedDemographics = data.selectedDemographics;
		}
		return inputs;
	} catch {
		return null;
	}
}

function isStringList(v: unknown): v is string[] {
	return Array.isArray(v) && v.every((d) => typeof d === 'string');
}

export function saveWizardInputs(inputs: WizardInputs) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
	} catch {
		// Storage full or blocked: the form still works, it just won't persist.
	}
}
