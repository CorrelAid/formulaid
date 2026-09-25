<script lang="ts">
	import { fade } from 'svelte/transition';
	import { demographicVariables, getProvider } from '$lib/constants';
	import { appSettings } from '$lib/settings.svelte';
	import { loadWizardInputs, saveWizardInputs } from '$lib/wizard_storage';
	import { locale, t } from '$lib/i18n';
	import { get } from 'svelte/store';
	import StepResults from '$lib/components/StepResults.svelte';
	import SurveyView from '$lib/components/SurveyView.svelte';
	import { descriptionHtml } from 'virtual:cdl-content';
	import {
		LeadAgent,
		MAX_REPAIR_ATTEMPTS,
		createModel,
		fileNameFor,
		type ValidationFinding,
		type RunPhase,
		type Survey,
		type Trace,
		demographicQuestions,
		MAX_RESEARCH_QUESTIONS
	} from '$lib/agents/index.js';

	// Form state
	// Restored from the last visit (#23); the examples only fill a first visit.
	const saved = loadWizardInputs();
	// Pre-select "formal" so the Sie/Du buttons never start empty — the agent
	// would default to it anyway, and the previous "nothing selected" state
	// left the user guessing which side of the toggle was active.
	let language = $state<'formal' | 'informal'>(saved?.language ?? 'formal');
	// Language of every question, label, hint and title (#39). Defaults to
	// German to match the rest of the toolchain.
	let surveyLanguage = $state<'de' | 'en'>(saved?.surveyLanguage ?? 'de');
	let selectedDemographics = $state<string[]>(saved?.selectedDemographics ?? []);
	// One field per research question (#34), capped: each needs its own questions.
	let researchQuestions = $state<string[]>(
		saved?.researchQuestions ?? [
			'How satisfied are volunteers with their engagement in our organization?'
		]
	);
	let targetGroup = $state(
		saved?.targetGroup ?? 'Active volunteers of a mid-sized environmental NGO'
	);
	let useOfResults = $state(
		saved?.useOfResults ?? 'Annual donor report and internal programme evaluation'
	);
	// Free-form guidance for the generator (#40): length limits, terms to avoid,
	// topics to focus on. Optional and persisted across reloads.
	let furtherNotes = $state(saved?.furtherNotes ?? '');
	$effect(() => {
		saveWizardInputs({
			researchQuestions: [...researchQuestions],
			targetGroup,
			useOfResults,
			furtherNotes,
			language,
			surveyLanguage,
			selectedDemographics: [...selectedDemographics]
		});
	});

	function addResearchQuestion() {
		if (researchQuestions.length < MAX_RESEARCH_QUESTIONS) researchQuestions.push('');
	}

	function removeResearchQuestion(i: number) {
		researchQuestions.splice(i, 1);
		if (researchQuestions.length === 0) researchQuestions.push('');
	}

	function resetInputs() {
		researchQuestions = [''];
		targetGroup = '';
		useOfResults = '';
		furtherNotes = '';
		language = 'formal';
		surveyLanguage = 'de';
		selectedDemographics = [];
		resetResult();
	}
	let activeProvider = $derived(getProvider(appSettings.provider));
	const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

	// Generation state
	let aiLoading = $state(false);
	let aiStatus = $state('');
	let runProgress = $state(0);
	let traces = $state<Trace[]>([]);
	let generatedFile = $state<Blob | null>(null);
	let generatedSurvey = $state<Survey | null>(null);
	let validationFindings = $state<ValidationFinding[]>([]);
	let repairAttempts = $state(0);
	let qwacAvailable = $state(true);
	let abortController: AbortController | null = null;

	type WizardError =
		| { kind: 'privacy' }
		| { kind: 'modelNotFound' }
		| { kind: 'rateLimited' }
		| { kind: 'stream' }
		| { kind: 'message'; text: string };
	let wizardError = $state<WizardError | null>(null);

	let progress = $derived(generatedFile ? 100 : aiLoading ? runProgress : 0);

	/** Status text and progress per phase (#20). Repairs move the bar in steps
	 *  instead of jumping to the end, and it never reaches 100 before done. */
	function showPhase(p: RunPhase) {
		const tr = get(t);
		if (p.phase === 'searching') {
			aiStatus = tr('wizard.statusSearching');
			runProgress = 10;
		} else if (p.phase === 'generating') {
			aiStatus = tr('wizard.statusGenerating');
			runProgress = 15;
		} else if (p.phase === 'validating') {
			aiStatus = tr('wizard.statusValidating');
			runProgress = p.attempt === 0 ? 60 : 66 + p.attempt * 12;
		} else {
			aiStatus = `${tr('wizard.statusRepairing')} (${p.attempt}/${MAX_REPAIR_ATTEMPTS})`;
			runProgress = 60 + p.attempt * 12;
			repairAttempts = p.attempt;
		}
	}

	/** Map provider errors to something actionable (#21). The privacy hint is
	 *  OpenRouter-specific, so it only applies when OpenRouter is active. */
	function classifyError(msg: string): WizardError {
		const m = msg.toLowerCase();
		if (
			activeProvider.id === 'openrouter' &&
			(m.includes('no endpoints available') || m.includes('guardrail') || m.includes('data policy'))
		) {
			return { kind: 'privacy' };
		}
		// Busy models (e.g. the default one) get rate-limited upstream for everyone.
		if (/\b429\b/.test(m) || m.includes('too many requests') || m.includes('rate-limited')) {
			return { kind: 'rateLimited' };
		}
		if (m.includes('http 404') || /\b404\b/.test(m)) return { kind: 'modelNotFound' };
		if (m.includes('input stream') || m.includes('error in input')) return { kind: 'stream' };
		return { kind: 'message', text: msg };
	}

	function resetResult() {
		generatedFile = null;
		generatedSurvey = null;
		validationFindings = [];
		repairAttempts = 0;
		qwacAvailable = true;
		traces = [];
		aiStatus = '';
		runProgress = 0;
	}

	async function generateWithAI() {
		if (!appSettings.isKeySet) {
			wizardError = { kind: 'message', text: $t('wizard.apiKeyMissing') };
			return;
		}
		if (!researchQuestions.some((q) => q.trim())) {
			wizardError = { kind: 'message', text: $t('wizard.researchMissing') };
			return;
		}
		resetResult();
		wizardError = null;
		aiLoading = true;
		aiStatus = get(t)('wizard.statusStarting');
		runProgress = 5;
		const controller = new AbortController();
		abortController = controller;
		try {
			const ai = createModel(appSettings.apiKey, appSettings.model, appSettings.baseUrl);
			const result = await new LeadAgent(ai).run(
				{
					researchQuestions,
					targetGroup,
					useOfResults,
					language,
					surveyLanguage,
					selectedDemographics,
					demographicQuestions: demographicQuestions(selectedDemographics),
					furtherNotes: furtherNotes.trim() || undefined
				},
				{
					signal: controller.signal,
					onPhase: showPhase,
					onTrace: (trace) => traces.push(trace)
				}
			);

			generatedSurvey = result.survey;
			validationFindings = result.findings;
			repairAttempts = result.repairAttempts;
			qwacAvailable = result.qwacAvailable;
			generatedFile = new Blob([result.workbook as BlobPart], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			aiStatus = get(t)('wizard.statusDone');
		} catch (e) {
			// A cancelled run is not an error: go back to where the user started (#18).
			if (controller.signal.aborted) resetResult();
			else wizardError = classifyError((e as Error).message);
		} finally {
			aiLoading = false;
			abortController = null;
		}
	}

	function downloadFile(file: Blob, filename: string) {
		const url = URL.createObjectURL(file);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		link.click();
		// Revoking synchronously can cancel the download in some browsers.
		setTimeout(() => URL.revokeObjectURL(url));
	}
</script>

<svelte:head>
	<title>{$t('page.title')}</title>
</svelte:head>

<main>
	<div class="hero">
		<h1>{$t('page.title')}</h1>
		<!-- Build-time snippet from the wp_eins repo (our own content), not user input. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div class="description">{@html descriptionHtml[$locale]}</div>
	</div>

	<details class="skills-section">
		<summary>{$t('page.skillsHeading')}</summary>
		<div class="skills-body">
			<p>{$t('page.skillsIntro')}</p>
			<ol>
				<li>
					{$t('page.skillsStep1')}<br />
					<a href="https://github.com/CorrelAid/formulaid/raw/main/skills/xlsform.zip"
						>{$t('page.skillsStep1Link')}</a
					>
				</li>
				<li>{$t('page.skillsStep2')}</li>
				<li>
					<strong>{$t('page.skillsStep3Label')}</strong>
					{$t('page.skillsStep3')}<br />
					<div class="skill-install"><code>https://qwacback.correlaid.org/mcp</code></div>
				</li>
			</ol>
			<p class="field-hint">{$t('page.skillsUpdate')}</p>
		</div>
	</details>

	<section>
		<h2>{$t('wizard.phase1Heading')}</h2>
		<p>{$t('wizard.phase1Desc')}</p>
		<p class="field-hint guide-hint">
			{$t('wizard.researchGuide')}
			<a href="https://umfragen.civic-data.de/forschungsfragen" target="_blank" rel="noopener"
				>{$t('wizard.researchGuideLink')}</a
			>
		</p>
		{#each researchQuestions.keys() as i (i)}
			<div class="input-group research-question">
				<label for="research-question-{i}">{$t('wizard.researchLabel')} {i + 1}</label>
				<div class="research-row">
					<textarea
						id="research-question-{i}"
						rows="2"
						bind:value={researchQuestions[i]}
						placeholder={$t('wizard.researchPlaceholder')}
					></textarea>
					{#if researchQuestions.length > 1}
						<button
							class="remove-research"
							onclick={() => removeResearchQuestion(i)}
							aria-label="{$t('wizard.researchRemove')} {i + 1}"
							title={$t('wizard.researchRemove')}>×</button
						>
					{/if}
				</div>
			</div>
		{/each}
		{#if researchQuestions.length < MAX_RESEARCH_QUESTIONS}
			<button class="add-research" onclick={addResearchQuestion}>
				+ {$t('wizard.researchAdd')}
			</button>
		{:else}
			<p class="field-hint">{$t('wizard.researchMax')}</p>
		{/if}
	</section>

	<section>
		<h2>{$t('wizard.phase2Heading')}</h2>
		<p>{$t('wizard.phase2Desc')}</p>
		<div class="input-group">
			<label for="target-group">{$t('wizard.targetGroupLabel')}</label>
			<input
				id="target-group"
				type="text"
				bind:value={targetGroup}
				placeholder={$t('wizard.targetGroupPlaceholder')}
			/>
		</div>
		<div class="input-group">
			<label for="use-of-results">{$t('wizard.useOfResultsLabel')}</label>
			<input
				id="use-of-results"
				type="text"
				bind:value={useOfResults}
				placeholder={$t('wizard.useOfResultsPlaceholder')}
			/>
		</div>
		<div class="input-group">
			<label for="further-notes">{$t('wizard.furtherNotesLabel')}</label>
			<textarea
				id="further-notes"
				rows="3"
				bind:value={furtherNotes}
				placeholder={$t('wizard.furtherNotesPlaceholder')}
			></textarea>
			<p class="field-hint">{$t('wizard.furtherNotesHint')}</p>
		</div>
	</section>

	<section>
		<h2>{$t('wizard.phase3Heading')}</h2>
		<p>{$t('wizard.phase3Desc')}</p>

		<div class="setting-group">
			<span class="setting-label">{$t('wizard.surveyLanguageLabel')}</span>
			<p class="field-hint">{$t('wizard.surveyLanguageHint')}</p>
			<div class="toggle-group">
				<button
					class="toggle-btn"
					class:selected={surveyLanguage === 'de'}
					onclick={() => {
						surveyLanguage = 'de';
					}}
				>
					{$t('wizard.surveyLanguageGerman')}
				</button>
				<button
					class="toggle-btn"
					class:selected={surveyLanguage === 'en'}
					onclick={() => {
						surveyLanguage = 'en';
					}}
				>
					{$t('wizard.surveyLanguageEnglish')}
				</button>
			</div>
		</div>

		<div class="setting-group">
			<span class="setting-label">{$t('wizard.languageLabel')}</span>
			{#if surveyLanguage === 'en'}
				<p class="field-hint">{$t('wizard.formHintEnglish')}</p>
			{/if}
			<div class="toggle-group">
				<button
					class="toggle-btn"
					class:selected={language === 'formal'}
					disabled={surveyLanguage === 'en'}
					onclick={() => {
						language = 'formal';
					}}
				>
					{$t('wizard.formal')}
				</button>
				<button
					class="toggle-btn"
					class:selected={language === 'informal'}
					disabled={surveyLanguage === 'en'}
					onclick={() => {
						language = 'informal';
					}}
				>
					{$t('wizard.informal')}
				</button>
			</div>
		</div>

		<div class="setting-group">
			<span class="setting-label">{$t('wizard.demographicsLabel')}</span>
			<p class="field-hint">{$t('wizard.demographicsHint')}</p>
			<div class="checkbox-grid">
				{#each demographicVariables as variable (variable.question_name)}
					<label class="checkbox-item">
						<input
							type="checkbox"
							bind:group={selectedDemographics}
							value={variable.question_name}
						/>
						<span>{variable.name}</span>
					</label>
				{/each}
			</div>
		</div>
	</section>

	<section>
		<h2>{$t('wizard.modelHeading')}</h2>
		<p class="model-info">
			{#if activeProvider.id === 'custom'}
				{$t('wizard.modelInfoCustom')}
			{:else}
				{$t('wizard.modelInfoActive')} <strong>{activeProvider.label}</strong>.
				{$t('wizard.modelInfoKeys')}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external provider URL -->
				<a href={activeProvider.keysUrl} target="_blank" rel="noopener"
					>{displayUrl(activeProvider.keysUrl)}</a
				>,
				{$t('wizard.modelInfoModels')}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external provider URL -->
				<a href={activeProvider.modelsUrl} target="_blank" rel="noopener"
					>{displayUrl(activeProvider.modelsUrl)}</a
				>.
			{/if}
			{$t('wizard.modelInfoSwitch')}
		</p>
		{#if activeProvider.id === 'openrouter'}
			<p class="model-info">
				{$t('wizard.modelInfoOpenRouterFree')}
				<a href="https://openrouter.ai/settings/privacy" target="_blank" rel="noopener"
					>{$t('wizard.modelInfoPrivacyLink')}</a
				>.
			</p>
		{/if}
		<div class="input-group">
			<label for="model-select">{$t('wizard.modelLabel')}</label>
			<input
				id="model-select"
				type="text"
				bind:value={
					() => appSettings.modelInput,
					// Each provider keeps its own model name (#29).
					(v) => appSettings.setModel(v)
				}
				placeholder={activeProvider.defaultModel}
			/>
		</div>
	</section>

	{#if generatedFile && validationFindings.length > 0}
		<div
			class="validation-warn"
			class:has-errors={validationFindings.some((f) => f.severity === 'error')}
		>
			<p class="validation-warn-heading">
				{validationFindings.some((f) => f.severity === 'error')
					? $t('wizard.validationErrorsHeading')
					: $t('wizard.validationWarningsHeading')}
			</p>
			<ul>
				{#each validationFindings as finding (finding.severity + finding.message)}
					<li class="severity-{finding.severity}">
						<span class="severity-tag">{finding.severity}</span>
						<span class="finding-message">{finding.message}</span>
					</li>
				{/each}
			</ul>
			<p class="validation-warn-foot">
				{#if repairAttempts > 0}
					{$t('wizard.validationRepaired')} ({repairAttempts}/{MAX_REPAIR_ATTEMPTS})
				{/if}
				{$t('wizard.validationFoot')}
			</p>
		</div>
	{/if}

	{#if generatedSurvey && (generatedSurvey.reasoning || generatedSurvey.questions.some((q) => q.rationale))}
		<SurveyView survey={generatedSurvey} demographicNames={selectedDemographics} />
	{/if}

	{#if generatedFile && !qwacAvailable}
		<div class="warning-box" in:fade>
			<p>{$t('wizard.qwacUnavailable')}</p>
		</div>
	{/if}

	<StepResults
		{aiLoading}
		{aiStatus}
		{progress}
		{traces}
		hasFile={generatedFile !== null}
		onGenerate={generateWithAI}
		onCancel={() => abortController?.abort()}
		onDownload={() =>
			generatedFile && generatedSurvey && downloadFile(generatedFile, fileNameFor(generatedSurvey))}
		onReset={resetResult}
		onResetInputs={resetInputs}
	/>

	{#if typeof window !== 'undefined' && !appSettings.isKeySet}
		<div class="warning-box" in:fade>
			<p>{$t('wizard.apiKeyWarning')}</p>
		</div>
	{/if}

	{#if wizardError}
		<div class="error" in:fade>
			{#if wizardError.kind === 'privacy'}
				<p>
					<strong>{$t('wizard.error')}</strong>
					{$t('wizard.modelPrivacyError')}
					<a href="https://openrouter.ai/settings/privacy" target="_blank" rel="noopener"
						>openrouter.ai/settings/privacy</a
					>.
				</p>
			{:else if wizardError.kind === 'rateLimited'}
				<p><strong>{$t('wizard.error')}</strong> {$t('wizard.modelRateLimited')}</p>
			{:else if wizardError.kind === 'modelNotFound'}
				<p><strong>{$t('wizard.error')}</strong> {$t('wizard.modelNotFound')}</p>
			{:else if wizardError.kind === 'stream'}
				<p><strong>{$t('wizard.error')}</strong> {$t('wizard.modelStreamError')}</p>
			{:else}
				<p><strong>{$t('wizard.error')}</strong> {wizardError.text}</p>
			{/if}
			<button class="close-error" onclick={() => (wizardError = null)}>{$t('wizard.close')}</button>
		</div>
	{/if}

	<footer>
		<p>
			{$t('page.footer')}
			<a href="https://github.com/CorrelAid/formulaid" target="_blank" rel="noopener">GitHub</a>.
		</p>
	</footer>
</main>

<style>
	main {
		max-width: var(--dimension-content-max-width);
		margin: 0 auto;
		padding: var(--spacing-xl) var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-base);
	}

	.hero {
		background: var(--color-tertiary);
		padding: var(--spacing-2xl);
		border-radius: var(--radius-xl);
	}

	h1 {
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-text-primary);
	}

	.description {
		color: var(--color-text-primary);
		opacity: 0.85;
	}

	.description :global(p) {
		margin: 0;
	}

	section {
		background: var(--color-white);
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
	}

	h2 {
		color: var(--color-text-primary);
		margin: 0 0 var(--spacing-base) 0;
	}

	p {
		margin: 0 0 var(--spacing-base) 0;
		line-height: var(--line-height-relaxed);
	}

	.input-group {
		margin-bottom: var(--spacing-xs);
	}

	.input-group label,
	.setting-label {
		display: block;
		margin-bottom: var(--spacing-xs);
		font-weight: var(--font-weight-semibold);
		font-size: 0.8rem;
		color: var(--color-secondary);
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-wider);
	}

	input[type='text'],
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-md);
		font-size: 1rem;
		font-family: var(--font-family-body);
		transition: border-color 0.2s;
		box-sizing: border-box;
	}

	textarea {
		resize: vertical;
	}

	input[type='text']:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-secondary);
	}

	.setting-group {
		margin-bottom: var(--spacing-lg);
	}

	.toggle-group {
		display: flex;
		gap: 0;
	}

	.toggle-btn {
		padding: 0.5rem 1rem;
		border: var(--dimension-border-width) solid var(--color-text-primary);
		background: var(--color-white);
		cursor: pointer;
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
		/* font-weight is left out: it can't be smoothly interpolated, so
		 * `transition: all` made it snap while the colour kept fading, and
		 * the two changes looked out of sync (#43). */
		transition:
			background-color 0.2s,
			border-color 0.2s;
	}

	.toggle-btn:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.toggle-btn:first-child {
		border-radius: var(--radius-md) 0 0 var(--radius-md);
		border-right: none;
	}

	.toggle-btn:last-child {
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
	}

	.toggle-btn.selected {
		background: var(--color-tertiary);
		border-color: var(--color-text-primary);
		font-weight: var(--font-weight-semibold);
	}

	.checkbox-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		gap: var(--spacing-sm) var(--spacing-base);
		margin-top: var(--spacing-sm);
		padding: var(--spacing-base);
		background: color-mix(in srgb, var(--color-tertiary) 20%, white);
		border-radius: var(--radius-md);
	}

	.checkbox-item {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-xs);
		font-size: 0.9rem;
		line-height: var(--line-height-snug);
		cursor: pointer;
	}

	.checkbox-item input {
		flex-shrink: 0;
		margin: 0.15em 0 0;
	}

	/* Long German compounds (Beschäftigungsverhältnisse) must break inside
	   the column instead of pushing the text below the checkbox. */
	.checkbox-item span {
		min-width: 0;
		overflow-wrap: anywhere;
		hyphens: auto;
	}

	.warning-box {
		padding: var(--spacing-base);
		background: #fff8f0;
		border-left: 4px solid #e09100;
		border-radius: var(--radius-md);
		color: #8a5700;
	}

	.warning-box p {
		margin: 0;
	}

	.error {
		padding: var(--spacing-base);
		background: #ffebee;
		border-left: 4px solid #f44336;
		border-radius: var(--radius-md);
		color: #c62828;
	}

	.error p {
		margin: 0 0 var(--spacing-sm) 0;
	}

	.validation-warn {
		padding: var(--spacing-base);
		background: #fff8e1;
		border-left: 4px solid #f59e0b;
		border-radius: var(--radius-md);
		color: #78350f;
	}

	.validation-warn.has-errors {
		background: #ffebee;
		border-left-color: #f44336;
		color: #c62828;
	}

	.validation-warn-heading {
		margin: 0 0 var(--spacing-sm) 0;
		font-weight: var(--font-weight-semibold);
	}

	.validation-warn ul {
		list-style: none;
		padding: 0;
		margin: 0 0 var(--spacing-sm) 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.validation-warn li {
		display: flex;
		gap: 0.5rem;
		align-items: baseline;
		font-family: var(--font-family-mono, monospace);
		font-size: 0.85rem;
		line-height: 1.4;
	}

	.severity-tag {
		flex-shrink: 0;
		padding: 0.1rem 0.4rem;
		border-radius: 99px;
		font-size: 0.7rem;
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.severity-error .severity-tag {
		background: #c62828;
		color: white;
	}

	.severity-warning .severity-tag {
		background: #f59e0b;
		color: white;
	}

	.finding-message {
		word-break: break-word;
	}

	.validation-warn-foot {
		margin: 0;
		font-size: 0.85rem;
		opacity: 0.85;
	}

	.close-error {
		background: none;
		border: 1px solid #c62828;
		color: #c62828;
		padding: 0.3rem 0.75rem;
		border-radius: var(--radius-base);
		cursor: pointer;
		font-size: 0.85rem;
	}

	.close-error:hover {
		background: #c62828;
		color: white;
	}

	.skills-section {
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.skills-section summary {
		padding: var(--spacing-base) var(--spacing-lg);
		cursor: pointer;
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
		background: var(--color-white);
		transition: background 0.2s;
	}

	.skills-section summary:hover {
		background: #f5f0f4;
	}

	.model-info {
		font-size: 0.9rem;
		opacity: 0.75;
		margin-bottom: var(--spacing-base);
	}

	.model-info a {
		color: var(--color-text-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.skills-body {
		padding: var(--spacing-lg);
		background: var(--color-white);
		border-top: var(--dimension-border-width) solid var(--color-text-primary);
	}

	.skills-body ol {
		padding-left: var(--spacing-lg);
		margin: 0;
	}

	.skills-body li {
		margin-bottom: var(--spacing-base);
		line-height: var(--line-height-relaxed);
	}

	.skills-body li:last-child {
		margin-bottom: 0;
	}

	code {
		font-family: var(--font-family-mono);
		font-size: 0.85em;
		background: var(--color-tertiary);
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		word-break: break-all;
	}

	.skill-install {
		padding: var(--spacing-base);
		background: #fafafa;
		border-radius: var(--radius-md);
		margin-bottom: var(--spacing-base);
	}

	.skill-install code {
		display: block;
		word-break: break-all;
	}

	footer {
		text-align: center;
		padding: var(--spacing-lg) 0 0;
		font-size: 0.9rem;
		opacity: 0.6;
	}

	footer a {
		color: var(--color-text-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.field-hint {
		margin: var(--spacing-xs) 0 0;
		font-size: 0.85rem;
		color: color-mix(in srgb, var(--color-text-primary) 70%, white);
	}

	.research-row {
		display: flex;
		gap: var(--spacing-xs);
		align-items: flex-start;
	}

	.remove-research {
		flex: none;
		width: 2.25rem;
		height: 2.25rem;
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-md);
		background: var(--color-white);
		font-size: 1.25rem;
		line-height: 1;
		cursor: pointer;
	}

	.remove-research:hover {
		border-color: var(--color-secondary);
		color: var(--color-secondary);
	}

	.add-research {
		margin-top: var(--spacing-xs);
		padding: 0;
		border: none;
		background: none;
		font-size: 0.9rem;
		font-weight: var(--font-weight-semibold);
		color: var(--color-secondary);
		cursor: pointer;
	}

	.add-research:hover {
		text-decoration: underline;
	}

	.guide-hint {
		margin-bottom: var(--spacing-base);
	}

	.guide-hint a {
		color: var(--color-secondary);
	}
</style>
