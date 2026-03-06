<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { initDB, getDemographicQuestions } from '$lib/db';
	import { demographicVariables, CHAT_MODEL } from '$lib/constants';
	import { appSettings } from '$lib/settings.svelte.ts';
	import StepResults from '$lib/components/StepResults.svelte';
	import QuestionSearch from '$lib/components/QuestionSearch.svelte';

	// App State
	let language = $state<'formal' | 'informal' | null>(null);
	let selectedDemographics = $state<string[]>([]);
	let researchQuestion = $state('');
	let model = $state(CHAT_MODEL);
	
	// DuckDB State
	let contextResults = $state<any[]>([]);
	let demographicResults = $state<any[]>([]);
	let loading = $state(true);
	let searching = $state(false);
	let wizardError = $state<string | null>(null);
	let conn = $state<any>(null);

	// AI Status State
	let aiLoading = $state(false);
	let aiStatus = $state('');
	let traces = $state<any[]>([]);
	let generatedFile = $state<string | null>(null);

	$effect(() => {
		if (conn && selectedDemographics.length > 0) {
			getDemographicQuestions(conn, selectedDemographics).then(results => {
				demographicResults = results;
			});
		} else {
			demographicResults = [];
		}
	});

	async function generateWithAI() {
		if (!appSettings.isKeySet) {
			wizardError = 'Bitte setzen Sie zuerst einen API Key im Header.';
			return;
		}
		aiLoading = true;
		aiStatus = 'Starte...';
		traces = [];
		generatedFile = null;
		wizardError = null;
		try {
			// Convert context results to types for the agent
			const contextQuestions = contextResults.map(r => ({
				id: r.question_id,
				name: r.question_name || `q_${r.question_id}`,
				label: r.question_text,
				type: mapToQuestionType(r.question_type),
				choices: parseChoices(r.answer_options_text),
				required: true
			}));

			const demographicQuestions = demographicResults.map(r => ({
				id: r.question_id,
				name: r.question_name || `q_${r.question_id}`,
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
					language: language || 'formal',
					selectedDemographics,
					demographicQuestions,
					contextQuestions
				})
			});

			if (!response.ok) throw new Error('KI-Verfeinerung fehlgeschlagen.');
			
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
					} else if (data.type === 'trace') {
						traces.push(data.trace);
					} else if (data.type === 'result') {
						generatedFile = data.file;
						aiStatus = 'Fertig!';
					} else if (data.type === 'error') {
						throw new Error(data.message);
					}
				}
			}
		} catch (e) {
			wizardError = (e as Error).message;
		} finally {
			aiLoading = false;
		}
	}

	function mapToQuestionType(type: string): any {
		if (!type) return 'text';
		const t = type.toLowerCase();
		if (t.includes('single') || t.includes('one')) return 'select_one';
		if (t.includes('multiple')) return 'select_multiple';
		if (t.includes('number') || t.includes('integer')) return 'integer';
		return 'text';
	}

	function parseChoices(optionsText: string): any[] {
		if (!optionsText) return [];
		return optionsText.split('\n').filter(line => line.trim()).map((line, i) => ({
			label: line.trim(),
			name: `choice_${i}`
		}));
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

	onMount(async () => {
		conn = await initDB();
		loading = false;
	});
</script>

<div class="container">
	<div class="header">
		<a href="/" class="back-link">← Zurück</a>
		<h1>Formulaid Wizard</h1>
	</div>
	
	<div class="card">
		{#if loading}
			<div class="loading-state" in:fade>
				<p>Initialisiere Suche...</p>
				<div class="spinner"></div>
			</div>
		{:else}
			<!-- Configuration Section -->
			<section class="config-section">
				<h2>1. KI Modell</h2>
				<div class="input-group">
					<label for="model-select">OpenRouter Model</label>
					<input 
						id="model-select" 
						type="text" 
						bind:value={model} 
						placeholder="e.g. mistralai/ministral-14b-2512" 
					/>
				</div>
			</section>

			<!-- Settings Section -->
			<section class="settings-section">
				<h2>2. Survey Einstellungen</h2>
				<p>Wählen Sie Sprache und demografische Variablen.</p>
				
				<div class="setting-group">
					<label>Sprache & Tonalität</label>
					<div class="options">
						<button 
							class="option-pill" 
							class:selected={language === 'formal'} 
							onclick={() => { language = 'formal'; }}
						>
							Förmlich (Sie)
						</button>
						<button 
							class="option-pill" 
							class:selected={language === 'informal'} 
							onclick={() => { language = 'informal'; }}
						>
							Informell (Du)
						</button>
					</div>
				</div>

				<div class="setting-group">
					<label>Demografische Merkmale</label>
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

			<!-- Research Section -->
			<section class="research-section">
				<h2>3. Forschungsziel & Kontext (RAG)</h2>
				<p>Beschreiben Sie Ihr Ziel. Wir suchen automatisch nach passenden Beispielen.</p>
				
				<QuestionSearch 
					{conn} 
					apiKey={appSettings.apiKey} 
					bind:researchQuestion
					bind:contextResults
					bind:searching
					onSearchError={(msg) => wizardError = msg}
				/>
			</section>

			<!-- Results/Action Section -->
			<StepResults 
				{aiLoading} 
				{aiStatus} 
				{traces}
				{generatedFile}
				onGenerate={generateWithAI}
				onDownload={() => downloadExcel('questionnaire.xlsx', generatedFile!)}
				onReset={() => {
					generatedFile = null;
					traces = [];
					aiStatus = '';
				}}
			/>
		{/if}

		{#if !appSettings.isKeySet && !loading && !indexing}
			<div class="warning-box" in:fade>
				<p>⚠️ <strong>API Key fehlt:</strong> Bitte setzen Sie Ihren OpenRouter API Key oben im Header, um alle Funktionen nutzen zu können.</p>
			</div>
		{/if}

		{#if wizardError}
			<div class="error-box" in:fade>
				<p><strong>Fehler:</strong> {wizardError}</p>
				<button onclick={() => wizardError = null}>Schließen</button>
			</div>
		{/if}
	</div>

	<footer>
		<div class="imprint">
			<p>
				<strong>Imprint & Liability:</strong> This is a client-side only application. 
				Your API key is never sent to our servers. Use this tool at your own risk and liability. 
				The app is open source and available at <a href="https://github.com/CorrelAid/formulaid" target="_blank" rel="noopener">GitHub</a>.
			</p>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		font-family: var(--font-family-body);
		background-color: var(--color-background-primary);
		margin: 0;
		padding: 0;
		color: var(--color-text-primary);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4rem 2rem;
	}

	.header {
		width: 100%;
		max-width: 800px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 2rem;
	}

	.back-link {
		text-decoration: none;
		color: var(--color-secondary);
		font-weight: 500;
		margin-bottom: 1rem;
	}

	h1 {
		color: var(--color-text-primary);
		font-family: var(--font-family-heading);
		font-size: 2.5rem;
		margin: 0;
	}

	.card {
		background: white;
		width: 100%;
		max-width: 800px;
		padding: 4rem;
		border-radius: 2rem;
		box-shadow: 0 15px 35px rgba(0,0,0,0.07);
	}

	section {
		margin-bottom: 4rem;
	}

	h2 {
		color: var(--color-text-primary, #333);
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid #f0f0f0;
		padding-bottom: 0.5rem;
	}

	p {
		color: #666;
		margin-bottom: 1.5rem;
	}

	.input-group label, .setting-group label {
		display: block;
		margin-bottom: 0.75rem;
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--color-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	input[type="text"] {
		width: 100%;
		padding: 0.85rem;
		border: 2px solid #f0f0f0;
		border-radius: 0.75rem;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	input:focus {
		outline: none;
		border-color: var(--color-secondary);
	}

	.options {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.option-pill {
		padding: 0.6rem 1.2rem;
		border: 2px solid #f0f0f0;
		border-radius: 2rem;
		background: white;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s;
	}

	.option-pill.selected {
		background: var(--color-secondary);
		color: white;
		border-color: var(--color-secondary);
	}

	.checkbox-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 0.5rem;
		padding: 1rem;
		background: #fafafa;
		border-radius: 1rem;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		cursor: pointer;
	}

	.loading-state {
		text-align: center;
		padding: 3rem 0;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f0f0f0;
		border-top: 4px solid var(--color-secondary, #5b92f6);
		border-radius: 50%;
		margin: 1.5rem auto;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.warning-box {
		margin-bottom: 2rem;
		padding: 1rem;
		background: #fffaf0;
		border: 1px solid #feebc8;
		border-radius: 0.75rem;
		color: #9c4221;
		text-align: center;
	}

	.error-box {
		margin-top: 2rem;
		padding: 1rem;
		background: #fff5f5;
		border: 1px solid #feb2b2;
		border-radius: 0.75rem;
		color: #c53030;
		text-align: center;
	}

	footer {
		margin-top: 4rem;
		text-align: center;
		color: var(--color-secondary);
		font-size: 0.85rem;
		opacity: 0.7;
	}
</style>
