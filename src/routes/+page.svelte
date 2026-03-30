<script lang="ts">
	import { fade } from 'svelte/transition';
	import { demographicVariables, CHAT_MODEL, type DemographicVariable } from '$lib/constants';
	import { appSettings } from '$lib/settings.svelte.ts';
	import { locale, t } from '$lib/i18n';
	import { get } from 'svelte/store';
	import StepResults from '$lib/components/StepResults.svelte';
	import { descriptionHtml } from 'virtual:cdl-content';

	// Form state
	let language = $state<'formal' | 'informal' | null>(null);
	let selectedDemographics = $state<string[]>([]);
	let researchQuestion = $state('How satisfied are volunteers with their engagement in our organization?');
	let targetGroup = $state('Active volunteers of a mid-sized environmental NGO');
	let useOfResults = $state('Annual donor report and internal programme evaluation');
	let model = $state(CHAT_MODEL);
	let isFreeModel = $derived(model.endsWith(':free'));

	// Generation state
	let aiLoading = $state(false);
	let aiStatus = $state('');
	let aiStep = $state(0);
	let traces = $state<any[]>([]);
	let generatedFile = $state<string | null>(null);
	let wizardError = $state<string | null>(null);

	// 4 known status events → 25% each; clamp at 95 until done
	let progress = $derived(
		generatedFile ? 100 : aiLoading ? Math.min(95, aiStep * 25) : 0
	);

	function getDemographicQuestions(selected: string[]): DemographicVariable[] {
		return demographicVariables.filter(v => selected.includes(v.question_name));
	}

	function mapToQuestionType(type: string): string {
		if (!type) return 'text';
		const t = type.toLowerCase();
		if (t.includes('single') || t.includes('one') || t === 'select_one') return 'select_one';
		if (t.includes('multiple')) return 'select_multiple';
		if (t.includes('number') || t.includes('integer')) return 'integer';
		if (t.includes('date')) return 'date';
		return 'text';
	}

	function parseChoices(optionsText: string): any[] {
		if (!optionsText) return [];
		return optionsText.split('\n').filter(line => line.trim()).map((line, i) => ({
			label: line.trim(),
			name: `choice_${i}`
		}));
	}

	async function generateWithAI() {
		if (!appSettings.isKeySet && !isFreeModel) {
			wizardError = $t('wizard.apiKeyMissing');
			return;
		}
		aiLoading = true;
		aiStatus = get(t)('wizard.statusStarting');
		aiStep = 1;
		traces = [];
		generatedFile = null;
		wizardError = null;
		try {
			const demoQuestions = getDemographicQuestions(selectedDemographics).map(r => ({
				id: r.question_id,
				name: r.question_name,
				label: r.question_text,
				type: mapToQuestionType(r.question_type),
				choices: parseChoices(r.answer_options_text),
				required: true
			}));

			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					apiKey: appSettings.apiKey,
					model,
					researchQuestion,
					targetGroup,
					useOfResults,
					language: language || 'formal',
					selectedDemographics,
					demographicQuestions: demoQuestions,
					contextQuestions: []
				})
			});

			if (!response.ok) throw new Error('Generation failed.');

			const reader = response.body?.getReader();
			if (!reader) throw new Error('Response body is empty');

			const decoder = new TextDecoder();
			let buffer = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split('\n');
				buffer = lines.pop() || '';

				for (const line of lines) {
					if (!line.trim()) continue;
					const data = JSON.parse(line);
					if (data.type === 'status') {
						aiStatus = data.message;
						aiStep += 1;
					} else if (data.type === 'trace') {
						traces.push(data.trace);
					} else if (data.type === 'result') {
						generatedFile = data.file;
						aiStatus = get(t)('wizard.statusDone');
					} else if (data.type === 'error') {
						throw new Error(data.message);
					}
				}
			}
		} catch (e) {
			const msg = (e as Error).message;
			const m = msg.toLowerCase();
			if (m.includes('no endpoints available') || m.includes('guardrail') || m.includes('data policy') || m.includes('http 404') || (m.includes('404') && m.includes('endpoint'))) {
				wizardError = '__privacy__';
			} else if (m.includes('input stream') || m.includes('error in input')) {
				wizardError = '__stream__';
			} else {
				wizardError = msg;
			}
		} finally {
			aiLoading = false;
		}
	}

	function downloadExcel(filename: string, base64: string) {
		const binary = atob(base64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}
		const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', filename);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<svelte:head>
	<title>{$t('page.title')}</title>
</svelte:head>

<main>
	<div class="hero">
		<h1>{$t('page.title')}</h1>
		<div class="description">{@html descriptionHtml[$locale]}</div>
	</div>

	<details class="skills-section">
		<summary>{$t('page.skillsHeading')}</summary>
		<div class="skills-body">
			<p>{$t('page.skillsIntro')}</p>
			<ol>
				<li>
					{$t('page.skillsStep1')}<br>
					<a href="https://github.com/CorrelAid/formulaid/raw/main/skills/xlsform.zip">{$t('page.skillsStep1Link')}</a>
				</li>
				<li>{$t('page.skillsStep2')}</li>
				<li>
					<strong>{$t('page.skillsStep3Label')}</strong> {$t('page.skillsStep3')}<br>
					<div class="skill-install"><code>https://qwacback.correlaid.org/mcp</code></div>
				</li>
			</ol>
		</div>
	</details>

	<section>
		<h2>{$t('wizard.phase1Heading')}</h2>
		<p>{$t('wizard.phase1Desc')}</p>
		<div class="input-group">
			<label for="research-question">{$t('wizard.researchLabel')}</label>
			<textarea
				id="research-question"
				rows="3"
				bind:value={researchQuestion}
				placeholder={$t('wizard.researchPlaceholder')}
			></textarea>
		</div>
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
	</section>

	<section>
		<h2>{$t('wizard.phase3Heading')}</h2>
		<p>{$t('wizard.phase3Desc')}</p>

		<div class="setting-group">
			<span class="setting-label">{$t('wizard.languageLabel')}</span>
			<div class="toggle-group">
				<button
					class="toggle-btn"
					class:selected={language === 'formal'}
					onclick={() => { language = 'formal'; }}
				>
					{$t('wizard.formal')}
				</button>
				<button
					class="toggle-btn"
					class:selected={language === 'informal'}
					onclick={() => { language = 'informal'; }}
				>
					{$t('wizard.informal')}
				</button>
			</div>
		</div>

		<div class="setting-group">
			<span class="setting-label">{$t('wizard.demographicsLabel')}</span>
			<div class="checkbox-grid">
				{#each demographicVariables as variable (variable.question_name)}
					<label class="checkbox-item">
						<input type="checkbox" bind:group={selectedDemographics} value={variable.question_name}>
						<span>{variable.name}</span>
					</label>
				{/each}
			</div>
		</div>
	</section>

	<details class="model-section">
		<summary>{$t('wizard.modelHeading')}</summary>
		<div class="model-body">
			<p class="model-info">
				{$t('wizard.modelInfo')} <a href="https://openrouter.ai" target="_blank" rel="noopener">{$t('wizard.modelInfoLink')}</a>
				{$t('wizard.modelInfoMid')} <a href="https://openrouter.ai/models" target="_blank" rel="noopener">{$t('wizard.modelInfoModelsLink')}</a>
				{$t('wizard.modelInfoEnd')} <a href="https://openrouter.ai/settings/privacy" target="_blank" rel="noopener">{$t('wizard.modelInfoPrivacyLink')}</a>.
			</p>
			<p class="model-tool-note">{$t('wizard.modelToolNote')}</p>
			<div class="input-group">
				<label for="model-select">{$t('wizard.modelLabel')}</label>
				<input
					id="model-select"
					type="text"
					bind:value={model}
					placeholder="e.g. mistralai/ministral-14b-2512"
				/>
			</div>
		</div>
	</details>

	<StepResults
		{aiLoading}
		{aiStatus}
		{progress}
		{traces}
		{generatedFile}
		onGenerate={generateWithAI}
		onDownload={() => downloadExcel('questionnaire.xlsx', generatedFile!)}
		onReset={() => {
			generatedFile = null;
			traces = [];
			aiStatus = '';
			aiStep = 0;
		}}
	/>

	{#if typeof window !== 'undefined' && !appSettings.isKeySet && !isFreeModel}
		<div class="warning-box" in:fade>
			<p>{$t('wizard.apiKeyWarning')}</p>
		</div>
	{/if}

	{#if wizardError}
		<div class="error" in:fade>
			{#if wizardError === '__privacy__'}
				<p><strong>{$t('wizard.error')}</strong> {$t('wizard.modelPrivacyError')} <a href="https://openrouter.ai/settings/privacy" target="_blank" rel="noopener">openrouter.ai/settings/privacy</a>.</p>
			{:else if wizardError === '__stream__'}
				<p><strong>{$t('wizard.error')}</strong> {$t('wizard.modelStreamError')}</p>
			{:else}
				<p><strong>{$t('wizard.error')}</strong> {wizardError}</p>
			{/if}
			<button class="close-error" onclick={() => wizardError = null}>{$t('wizard.close')}</button>
		</div>
	{/if}

	<footer>
		<p>
			This tool is open source and available at <a href="https://github.com/CorrelAid/formulaid" target="_blank" rel="noopener">GitHub</a>.
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
	.setting-group label,
	.setting-label {
		display: block;
		margin-bottom: var(--spacing-xs);
		font-weight: var(--font-weight-semibold);
		font-size: 0.8rem;
		color: var(--color-secondary);
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-wider);
	}

	input[type="text"],
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

	input[type="text"]:focus,
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
		transition: all 0.2s;
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
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-xs);
		padding: var(--spacing-base);
		background: color-mix(in srgb, var(--color-tertiary) 20%, white);
		border-radius: var(--radius-md);
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: 0.9rem;
		cursor: pointer;
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

	.model-section,
	.skills-section {
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.model-section summary,
	.skills-section summary {
		padding: var(--spacing-base) var(--spacing-lg);
		cursor: pointer;
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
		background: var(--color-white);
		transition: background 0.2s;
	}

	.model-section summary:hover,
	.skills-section summary:hover {
		background: #f5f0f4;
	}

	.model-body {
		padding: var(--spacing-lg);
		background: var(--color-white);
		border-top: var(--dimension-border-width) solid var(--color-text-primary);
	}

	.model-info {
		font-size: 0.9rem;
		opacity: 0.75;
		margin-bottom: var(--spacing-base);
	}

	.model-tool-note {
		font-size: 0.85rem;
		padding: var(--spacing-xs) var(--spacing-sm);
		background: #fff8f0;
		border-left: 3px solid #e09100;
		border-radius: var(--radius-sm);
		color: #8a5700;
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
</style>
