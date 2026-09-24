/** Wizard inputs kept across reloads (#23). None of this is secret; the API
 *  key has its own handling in storage.ts. */
export interface WizardInputs {
	researchQuestion: string;
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
		for (const key of ['researchQuestion', 'targetGroup', 'useOfResults'] as const) {
			if (typeof data[key] === 'string') inputs[key] = data[key];
		}
		if (data.language === 'formal' || data.language === 'informal' || data.language === null) {
			inputs.language = data.language;
		}
		if (
			Array.isArray(data.selectedDemographics) &&
			data.selectedDemographics.every((d) => typeof d === 'string')
		) {
			inputs.selectedDemographics = data.selectedDemographics;
		}
		return inputs;
	} catch {
		return null;
	}
}

export function saveWizardInputs(inputs: WizardInputs) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
	} catch {
		// Storage full or blocked: the form still works, it just won't persist.
	}
}
