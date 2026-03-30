import { writable, derived } from 'svelte/store';

export type Locale = 'en' | 'de';

export const locale = writable<Locale>('en');

const translations: Record<Locale, Record<string, string>> = {
	en: {
		// Layout
		'layout.imprint': 'Imprint',

		// Main page
		'page.title': 'FormulAid',
		'page.skillsHeading': 'Use as Skill in Claude',
		'page.skillsIntro':
			'The survey design knowledge behind FormulAid is packaged as a Claude skill. Instead of using this web app, you can import it directly into Claude and use it from your browser. It includes survey methodology references and integrates with the qwac question bank.',
		'page.skillsStep1': 'Download the skill file from GitHub:',
		'page.skillsStep1Link': 'Download xlsform.zip',
		'page.skillsStep2': 'In Claude, go to Customize → Skills and upload the downloaded zip file.',
		'page.skillsStep3Label': 'Required:',
		'page.skillsStep3': 'In Claude, go to Customize → Add custom connector and enter the MCP server URL below. The skill needs this connector to search the qwac question bank:',

		// Form
		'wizard.modelHeading': 'AI Model',
		'wizard.modelLabel': 'OpenRouter Model',
		'wizard.phase1Heading': '1. Research Goal',
		'wizard.phase1Desc': 'Describe what you want to find out. One sentence is enough.',
		'wizard.researchLabel': 'What do you want to find out?',
		'wizard.researchPlaceholder': 'e.g. Employee satisfaction in remote work',
		'wizard.phase2Heading': '2. Context',
		'wizard.phase2Desc': 'Help the AI understand who will be surveyed and how the results will be used.',
		'wizard.targetGroupLabel': 'Who should be surveyed?',
		'wizard.targetGroupPlaceholder': 'e.g. NGO members, employees, customers',
		'wizard.useOfResultsLabel': 'What happens with the results?',
		'wizard.useOfResultsPlaceholder': 'e.g. Internal report, donor presentation, research publication',
		'wizard.phase3Heading': '3. Settings',
		'wizard.phase3Desc': 'Choose language tone and optional demographic variables.',
		'wizard.languageLabel': 'Language & Tone',
		'wizard.formal': 'Formal (Sie)',
		'wizard.informal': 'Informal (Du)',
		'wizard.demographicsLabel': 'Demographic Variables',
		'wizard.generateBtn': 'Generate survey with AI',
		'wizard.generateNew': 'Generate new',
		'wizard.downloadFile': 'Download file',
		'wizard.generated': 'XLSForm generated.',
		'wizard.statusStarting': 'Starting...',
		'wizard.statusDone': 'Done!',
		'wizard.apiKeyMissing': 'Please set an API Key in the header first.',
		'wizard.apiKeyWarning': 'API Key missing: Please set your OpenRouter API Key above in the header to use all features.',
		'wizard.error': 'Error:',
		'wizard.close': 'Close',

		// Header
		'header.apiKeySet': 'API Key set',
		'header.apiKeyMissing': 'API Key missing',
		'header.settingsTitle': 'OpenRouter Settings',
		'header.apiKeyLabel': 'API Key',
		'header.storageLabel': 'Storage Mode',
		'header.ram': 'RAM',
		'header.timed': '1h persistent',
		'header.save': 'Save & Validate',
		'header.apiKeyError': 'API key validation failed.',

		// Imprint
		'imprint.title': 'Imprint',
		'imprint.hostedBy': 'This tool is hosted by',
		'imprint.correlaid': 'CorrelAid',
		'imprint.partOfCdl': ' within the ',
		'imprint.cdl': 'Civic Data Lab',
		'imprint.referenceText': 'For the full imprint, please refer to'
	},
	de: {
		// Layout
		'layout.imprint': 'Impressum',

		// Main page
		'page.title': 'FormulAid',
		'page.skillsHeading': 'Als Skill in Claude nutzen',
		'page.skillsIntro':
			'Das Umfrage-Wissen hinter FormulAid ist als Claude-Skill verpackt. Anstatt diese Web-App zu nutzen, kannst du ihn direkt in Claude importieren und im Browser verwenden. Der Skill enthält Methodenreferenzen und nutzt die qwac-Fragendatenbank.',
		'page.skillsStep1': 'Skill-Datei von GitHub herunterladen:',
		'page.skillsStep1Link': 'xlsform.zip herunterladen',
		'page.skillsStep2': 'In Claude: Anpassen → Skills → heruntergeladene Zip-Datei hochladen.',
		'page.skillsStep3Label': 'Erforderlich:',
		'page.skillsStep3': 'In Claude: Anpassen → Benutzerdefinierten Connector hinzufügen → folgende MCP-Server-URL eingeben. Der Skill benötigt diesen Connector, um die qwac-Fragendatenbank zu durchsuchen:',

		// Form
		'wizard.modelHeading': 'KI Modell',
		'wizard.modelLabel': 'OpenRouter Model',
		'wizard.phase1Heading': '1. Forschungsziel',
		'wizard.phase1Desc': 'Beschreibe, was du herausfinden möchtest. Ein Satz reicht.',
		'wizard.researchLabel': 'Was willst du herausfinden?',
		'wizard.researchPlaceholder': 'z.B. Mitarbeiterzufriedenheit im Homeoffice',
		'wizard.phase2Heading': '2. Kontext',
		'wizard.phase2Desc': 'Hilf der KI zu verstehen, wer befragt wird und wie die Ergebnisse genutzt werden.',
		'wizard.targetGroupLabel': 'Wer soll befragt werden?',
		'wizard.targetGroupPlaceholder': 'z.B. Vereinsmitglieder, Mitarbeitende, Kund:innen',
		'wizard.useOfResultsLabel': 'Was passiert mit den Ergebnissen?',
		'wizard.useOfResultsPlaceholder': 'z.B. Interner Bericht, Gebernachweis, Forschungsveröffentlichung',
		'wizard.phase3Heading': '3. Einstellungen',
		'wizard.phase3Desc': 'Wähle Anredeform und optionale demografische Merkmale.',
		'wizard.languageLabel': 'Sprache & Tonalität',
		'wizard.formal': 'Förmlich (Sie)',
		'wizard.informal': 'Informell (Du)',
		'wizard.demographicsLabel': 'Demografische Merkmale',
		'wizard.generateBtn': 'Umfrage mit KI generieren',
		'wizard.generateNew': 'Neu generieren',
		'wizard.downloadFile': 'Datei herunterladen',
		'wizard.generated': 'XLSForm wurde generiert.',
		'wizard.statusStarting': 'Starte...',
		'wizard.statusDone': 'Fertig!',
		'wizard.apiKeyMissing': 'Bitte setzen Sie zuerst einen API Key im Header.',
		'wizard.apiKeyWarning': 'API Key fehlt: Bitte setzen Sie Ihren OpenRouter API Key oben im Header, um alle Funktionen nutzen zu können.',
		'wizard.error': 'Fehler:',
		'wizard.close': 'Schließen',

		// Header
		'header.apiKeySet': 'API Key gesetzt',
		'header.apiKeyMissing': 'API Key fehlt',
		'header.settingsTitle': 'OpenRouter Einstellungen',
		'header.apiKeyLabel': 'API Key',
		'header.storageLabel': 'Speichermodus',
		'header.ram': 'RAM',
		'header.timed': '1h persistent',
		'header.save': 'Speichern & Validieren',
		'header.apiKeyError': 'API Key Validierung fehlgeschlagen.',

		// Imprint
		'imprint.title': 'Impressum',
		'imprint.hostedBy': 'Dieses Tool wird bereitgestellt von',
		'imprint.correlaid': 'CorrelAid',
		'imprint.partOfCdl': ', als Teil des',
		'imprint.cdl': 'Civic Data Lab',
		'imprint.referenceText': 'Das vollständige Impressum finden Sie unter'
	}
};

export const t = derived(locale, ($locale) => {
	return (key: string): string => {
		return translations[$locale][key] ?? key;
	};
});
