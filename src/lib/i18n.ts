import { writable, derived } from 'svelte/store';

export type Locale = 'en' | 'de';

/** German is the default: the downstream tools (qwac, the question bank) are
 *  German-first, so an English default made the handover jarring (#6). */
export const locale = writable<Locale>('de');

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
		'page.skillsStep3':
			'In Claude, go to Customize → Add custom connector and enter the MCP server URL below. The skill needs this connector to search the qwac question bank:',

		// Form
		'wizard.modelHeading': '4. AI Model',
		'wizard.modelToolNote':
			'The model must support tool/function calling: the agent uses it to search the question bank. If generation fails, try a different model.',
		'wizard.modelInfoPrivacyLink': 'OpenRouter privacy settings',
		'wizard.modelPrivacyError':
			'OpenRouter blocked the request due to your privacy settings. Allow third-party model access at',
		'wizard.modelStreamError':
			'The model dropped the connection mid-generation. This usually means the model does not support streaming or tool calling well. Try a different model.',
		'wizard.modelLabel': 'Model',
		'wizard.phase1Heading': '1. Research Goal',
		'wizard.phase1Desc': 'Describe what you want to find out. One sentence is enough.',
		'wizard.researchLabel': 'What do you want to find out?',
		'wizard.researchPlaceholder': 'e.g. Employee satisfaction in remote work',
		'wizard.phase2Heading': '2. Context',
		'wizard.phase2Desc':
			'Help the AI understand who will be surveyed and how the results will be used.',
		'wizard.targetGroupLabel': 'Who should be surveyed?',
		'wizard.targetGroupPlaceholder': 'e.g. NGO members, employees, customers',
		'wizard.useOfResultsLabel': 'What happens with the results?',
		'wizard.useOfResultsPlaceholder':
			'e.g. Internal report, donor presentation, research publication',
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
		'wizard.statusStarting': 'Starting…',
		'wizard.statusDone': 'Done!',
		'wizard.validationErrorsHeading':
			'The generated questionnaire did not pass the CDL compatibility check.',
		'wizard.validationWarningsHeading':
			'The generated questionnaire passed the CDL compatibility check with warnings.',
		'wizard.validationFoot':
			'You can still download it, but the file may fail when converted later. Generate again or adjust the questions.',
		'wizard.researchHint':
			'You can enter more than one question — put each on its own line. The generator covers all of them in a single questionnaire.',
		'wizard.demographicsHint':
			'Each box adds one standard demographic question to the questionnaire, taken verbatim from the CDL question bank. The demographic questions are added at the end of the questionnaire.',
		'wizard.statusRepairing': 'Fixing validation errors…',
		'wizard.validationRepaired': 'Automatic repair attempts were made.',
		'wizard.reasoningHeading': 'Why these questions?',
		'wizard.reasoningIntro':
			'The generator’s own account of its selection. It is also written to the “explanations” sheet of the downloaded file.',
		'wizard.reasoningSource': 'Source',
		'wizard.apiKeyMissing': 'Please enter an API key at the top first.',
		'wizard.apiKeyWarning':
			'API key missing: enter an API key at the top to generate questionnaires.',
		'wizard.error': 'Error:',
		'wizard.close': 'Close',

		// Header
		'header.apiKeySet': 'API Key set',
		'header.apiKeyMissing': 'API Key missing',
		'header.settingsTitle': 'API settings',
		'header.apiKeyLabel': 'API Key',
		'header.storageLabel': 'Storage Mode',
		'header.ram': 'Until reload',
		'header.timed': 'Keep for 1 hour',
		'header.save': 'Save & check',
		'header.providerLabel': 'Provider',
		'header.providerKeyHint': 'Create an API key at',
		'header.customUrlHint':
			'Base URL of an OpenAI-compatible endpoint, e.g. https://my-gateway.example/v1. It is called directly from your browser, so it has to allow this origin via CORS.',
		'header.customUrlMissing': 'Please enter the base URL of your endpoint.',
		'header.endpointUnreachable':
			'The endpoint could not be reached from the browser. Check the URL and whether the endpoint sends CORS headers for this origin.',
		'header.apiKeyError': 'API key validation failed.',
		'header.apiKeyNoLimit': 'Please set a credit limit on your OpenRouter key (max $5).',
		'header.apiKeyLimitTooHigh':
			'Credit limit must be $5 or less. Please lower it in your OpenRouter key settings.',
		'page.footer': 'This tool is open source and available on',
		'wizard.modelInfoActive': 'Requests currently go to',
		'wizard.modelInfoKeys': 'Create an API key at',
		'wizard.modelInfoModels': 'and find available model names at',
		'wizard.modelInfoCustom':
			'Requests currently go to your own OpenAI-compatible endpoint. Enter a model name that this endpoint offers.',
		'wizard.modelInfoSwitch': 'You can switch provider with the API key button at the top.',
		'wizard.modelInfoOpenRouterFree':
			'Free models (name ends in :free) work well for most surveys. If you get a “No endpoints available” error, allow third-party model access in your',
		'wizard.modelToolNoteFree':
			'Many free models do not support tool calling. A known working free model is qwen/qwen3.6-plus-preview:free.',
		'wizard.statusGenerating': 'Building the questionnaire from your research goal…',
		'wizard.statusValidating': 'Checking the questionnaire…',
		'wizard.cancel': 'Cancel',
		'wizard.resetInputs': 'Clear form',
		'wizard.modelNotFound':
			'The model was not found. Check the model name in section 4 and the provider’s model list.',
		'wizard.qwacUnavailable':
			'The qwac question bank could not be reached, so all questions were written by the model and none come from validated instruments. Generate again later to use the question bank.',
		'traces.step': 'Step',
		'traces.fallback': 'AI processing',
		'header.openRouterLimitHint':
			'The key needs a credit limit of at most $5. This is checked when you save.',

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
			'Das Umfrage-Wissen hinter FormulAid ist als Claude-Skill verpackt. Statt diese Web-App zu nutzen, kannst du ihn direkt in Claude importieren und im Browser verwenden. Der Skill enthält Methodenreferenzen und nutzt die qwac-Fragendatenbank.',
		'page.skillsStep1': 'Skill-Datei von GitHub herunterladen:',
		'page.skillsStep1Link': 'xlsform.zip herunterladen',
		'page.skillsStep2': 'In Claude: Anpassen → Skills → heruntergeladene Zip-Datei hochladen.',
		'page.skillsStep3Label': 'Erforderlich:',
		'page.skillsStep3':
			'In Claude: Anpassen → Benutzerdefinierten Connector hinzufügen → folgende MCP-Server-URL eingeben. Der Skill benötigt diesen Connector, um die qwac-Fragendatenbank zu durchsuchen:',

		// Form
		'wizard.modelHeading': '4. KI-Modell',
		'wizard.modelToolNote':
			'Das Modell muss Tool/Function Calling unterstützen: Der Agent nutzt es, um die Fragendatenbank zu durchsuchen. Schlägt die Generierung fehl, versuche ein anderes Modell.',
		'wizard.modelInfoPrivacyLink': 'OpenRouter-Datenschutzeinstellungen',
		'wizard.modelPrivacyError':
			'OpenRouter hat die Anfrage wegen deiner Datenschutzeinstellungen blockiert. Erlaube den Zugang zu Drittanbieter-Modellen unter',
		'wizard.modelStreamError':
			'Das Modell hat die Verbindung während der Generierung abgebrochen. Wahrscheinlich unterstützt es Streaming oder Tool Calling nicht richtig. Versuche ein anderes Modell.',
		'wizard.modelLabel': 'Modell',
		'wizard.phase1Heading': '1. Forschungsziel',
		'wizard.phase1Desc': 'Beschreibe, was du herausfinden möchtest. Ein Satz reicht.',
		'wizard.researchLabel': 'Was willst du herausfinden?',
		'wizard.researchPlaceholder': 'z. B. Mitarbeiterzufriedenheit im Homeoffice',
		'wizard.phase2Heading': '2. Kontext',
		'wizard.phase2Desc':
			'Hilf der KI zu verstehen, wer befragt wird und wie die Ergebnisse genutzt werden.',
		'wizard.targetGroupLabel': 'Wer soll befragt werden?',
		'wizard.targetGroupPlaceholder': 'z. B. Vereinsmitglieder, Mitarbeitende, Kund:innen',
		'wizard.useOfResultsLabel': 'Was passiert mit den Ergebnissen?',
		'wizard.useOfResultsPlaceholder':
			'z. B. interner Bericht, Gebernachweis, Forschungsveröffentlichung',
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
		'wizard.statusStarting': 'Starte…',
		'wizard.statusDone': 'Fertig!',
		'wizard.validationErrorsHeading':
			'Der generierte Fragebogen hat die CDL-Kompatibilitätsprüfung nicht bestanden.',
		'wizard.validationWarningsHeading':
			'Der generierte Fragebogen hat die CDL-Kompatibilitätsprüfung mit Warnungen bestanden.',
		'wizard.validationFoot':
			'Du kannst die Datei trotzdem herunterladen, sie kann aber bei der späteren Konvertierung fehlschlagen. Generiere den Fragebogen neu oder passe die Fragen an.',
		'wizard.researchHint':
			'Du kannst mehrere Fragen eingeben — jede in eine eigene Zeile. Der Generator deckt alle in einem Fragebogen ab.',
		'wizard.demographicsHint':
			'Jede Checkbox fügt eine soziodemografische Standardfrage wörtlich aus der CDL-Fragendatenbank hinzu. Fragen zu den demografischen Merkmalen werden am Ende hinzugefügt.',
		'wizard.statusRepairing': 'Behebe Validierungsfehler…',
		'wizard.validationRepaired': 'Es wurden automatische Korrekturversuche unternommen.',
		'wizard.reasoningHeading': 'Warum diese Fragen?',
		'wizard.reasoningIntro':
			'Die Begründung des Generators für seine Auswahl. Sie steht auch im Blatt „explanations“ der heruntergeladenen Datei.',
		'wizard.reasoningSource': 'Quelle',
		'wizard.apiKeyMissing': 'Bitte trage zuerst oben einen API-Key ein.',
		'wizard.apiKeyWarning':
			'API-Key fehlt: Trage oben einen API-Key ein, um Fragebögen zu generieren.',
		'wizard.error': 'Fehler:',
		'wizard.close': 'Schließen',

		// Header
		'header.apiKeySet': 'API-Key gesetzt',
		'header.apiKeyMissing': 'API-Key fehlt',
		'header.settingsTitle': 'API-Einstellungen',
		'header.apiKeyLabel': 'API-Key',
		'header.storageLabel': 'Speichermodus',
		'header.ram': 'Bis zum Neuladen',
		'header.timed': '1 Stunde speichern',
		'header.save': 'Speichern & prüfen',
		'header.providerLabel': 'Anbieter',
		'header.providerKeyHint': 'API-Key erstellen unter',
		'header.customUrlHint':
			'Basis-URL eines OpenAI-kompatiblen Endpunkts, z. B. https://my-gateway.example/v1. Der Aufruf erfolgt direkt aus dem Browser, der Endpunkt muss diese Origin also per CORS erlauben.',
		'header.customUrlMissing': 'Bitte trage die Basis-URL des Endpunkts ein.',
		'header.endpointUnreachable':
			'Der Endpunkt war aus dem Browser nicht erreichbar. Prüfe die URL und ob der Endpunkt CORS-Header für diese Origin sendet.',
		'header.apiKeyError': 'Der API-Key konnte nicht geprüft werden.',
		'header.apiKeyNoLimit': 'Bitte setze ein Ausgabenlimit für deinen OpenRouter-Key (max. 5 $).',
		'header.apiKeyLimitTooHigh':
			'Das Ausgabenlimit darf höchstens 5 $ betragen. Passe es in den Einstellungen deines OpenRouter-Keys an.',
		'page.footer': 'Dieses Tool ist Open Source und verfügbar auf',
		'wizard.modelInfoActive': 'Anfragen gehen aktuell an',
		'wizard.modelInfoKeys': 'Einen API-Key erstellst du unter',
		'wizard.modelInfoModels': 'verfügbare Modellnamen findest du unter',
		'wizard.modelInfoCustom':
			'Anfragen gehen aktuell an deinen eigenen OpenAI-kompatiblen Endpunkt. Trage einen Modellnamen ein, den dieser Endpunkt anbietet.',
		'wizard.modelInfoSwitch': 'Den Anbieter wechselst du über den API-Key-Button oben.',
		'wizard.modelInfoOpenRouterFree':
			'Kostenlose Modelle (Name endet auf :free) eignen sich für die meisten Umfragen. Bei einem „No endpoints available“-Fehler erlaube den Zugang zu Drittanbieter-Modellen in den',
		'wizard.modelToolNoteFree':
			'Viele kostenlose Modelle können das nicht. Ein bekannt funktionierendes kostenloses Modell ist qwen/qwen3.6-plus-preview:free.',
		'wizard.statusGenerating': 'Erstelle Fragebogen aus dem Forschungsziel…',
		'wizard.statusValidating': 'Prüfe den Fragebogen…',
		'wizard.cancel': 'Abbrechen',
		'wizard.resetInputs': 'Formular leeren',
		'wizard.modelNotFound':
			'Das Modell wurde nicht gefunden. Prüfe den Modellnamen in Abschnitt 4 und die Modellliste des Anbieters.',
		'wizard.qwacUnavailable':
			'Die Fragendatenbank qwac war nicht erreichbar. Alle Fragen wurden deshalb vom Modell formuliert, keine stammt aus validierten Instrumenten. Generiere später erneut, um die Fragendatenbank zu nutzen.',
		'traces.step': 'Schritt',
		'traces.fallback': 'KI-Verarbeitung',
		'header.openRouterLimitHint':
			'Der Key braucht ein Ausgabenlimit von höchstens 5 $. Das wird beim Speichern geprüft.',

		// Imprint
		'imprint.title': 'Impressum',
		'imprint.hostedBy': 'Dieses Tool wird bereitgestellt von',
		'imprint.correlaid': 'CorrelAid',
		'imprint.partOfCdl': ' im Rahmen des ',
		'imprint.cdl': 'Civic Data Lab',
		'imprint.referenceText': 'Das vollständige Impressum findest du unter'
	}
};

export const t = derived(locale, ($locale) => {
	return (key: string): string => {
		return translations[$locale][key] ?? key;
	};
});
