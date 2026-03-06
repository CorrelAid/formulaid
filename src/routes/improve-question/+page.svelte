<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { appSettings } from '$lib/settings.svelte.ts';
	import TraceList from '$lib/components/TraceList.svelte';
	import { CHAT_MODEL } from '$lib/constants';

	let model = $state(CHAT_MODEL);

	let questionLabel = $state('');
	let questionType = $state('text');
	let choicesText = $state('');
	let context = $state('');

	let improving = $state(false);
	let improvedQuestion = $state<{ label: string, choices: any[] } | null>(null);
	let traces = $state<any[]>([]);
	let error = $state<string | null>(null);

	const COMMON_GERMAN_CHOICES = {
		likert5: 'Stimme voll zu\nStimme eher zu\nTeils-teils\nStimme eher nicht zu\nStimme gar nicht zu',
		likert7: 'Stimme voll zu\nStimme zu\nStimme eher zu\nTeils-teils\nStimme eher nicht zu\nStimme nicht zu\nStimme gar nicht zu',
		frequency: 'Immer\nOft\nGelegentlich\nSelten\nNie',
		quality: 'Sehr gut\nGut\nMittelmäßig\nSchlecht\nSehr schlecht',
		yesno: 'Ja\nNein'
	};

	function applyCommonChoices(type: keyof typeof COMMON_GERMAN_CHOICES) {
		choicesText = COMMON_GERMAN_CHOICES[type];
	}

	async function handleImprove() {
		if (!questionLabel) return;

		if (!appSettings.isKeySet) {
			error = 'Bitte setzen Sie zuerst einen API Key im Header.';
			return;
		}

		improving = true;
		error = null;
		improvedQuestion = null;
		traces = [];

		const choices = (questionType === 'select_one' || questionType === 'select_multiple') 
			? choicesText.split('\n').filter(l => l.trim()).map((l, i) => ({
				label: l.trim(),
				name: `choice_${i}`
			}))
			: [];

		try {
			const response = await fetch('/api/improve', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					apiKey: appSettings.apiKey,
					model,
					label: questionLabel,
					type: questionType,
					choices,
					context
				})
			});

			if (!response.ok) throw new Error('Verbesserung fehlgeschlagen.');
			
			const result = await response.json();
			if (result.error) throw new Error(result.error);

			improvedQuestion = {
				label: result.label,
				choices: result.choices
			};
			traces = result.traces || [];
		} catch (e) {
			error = (e as Error).message;
		} finally {
			improving = false;
		}
	}
</script>

<div class="container">
	<div class="header">
		<a href="/" class="back-link">← Zurück</a>
		<h1>Question Improver</h1>
	</div>
	
	<div class="card">
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

		<section class="input-section">
			<h2>2. Ihre Frage</h2>
			<div class="input-group">
				<label for="label">Fragetext</label>
				<textarea id="label" bind:value={questionLabel} placeholder="z.B. Wie alt bist du?"></textarea>
			</div>

			<div class="input-group">
				<label>Fragetyp</label>
				<div class="options">
					<button 
						class="option-pill" 
						class:selected={questionType === 'text'} 
						onclick={() => { questionType = 'text'; }}
					>
						Text
					</button>
					<button 
						class="option-pill" 
						class:selected={questionType === 'integer'} 
						onclick={() => { questionType = 'integer'; }}
					>
						Ganzzahl
					</button>
					<button 
						class="option-pill" 
						class:selected={questionType === 'select_one'} 
						onclick={() => { questionType = 'select_one'; }}
					>
						Einfachauswahl
					</button>
					<button 
						class="option-pill" 
						class:selected={questionType === 'select_multiple'} 
						onclick={() => { questionType = 'select_multiple'; }}
					>
						Mehrfachauswahl
					</button>
					<button 
						class="option-pill" 
						class:selected={questionType === 'range'} 
						onclick={() => { questionType = 'range'; }}
					>
						Skala (Range)
					</button>
				</div>
			</div>

			{#if questionType === 'select_one' || questionType === 'select_multiple'}
				<div class="input-group" in:fade>
					<label for="choices">Antwortoptionen (eine pro Zeile)</label>
					
					<div class="common-choices-grid">
						<button class="small-pill" onclick={() => applyCommonChoices('likert5')}>Likert 5er</button>
						<button class="small-pill" onclick={() => applyCommonChoices('likert7')}>Likert 7er</button>
						<button class="small-pill" onclick={() => applyCommonChoices('frequency')}>Häufigkeit</button>
						<button class="small-pill" onclick={() => applyCommonChoices('quality')}>Qualität</button>
						<button class="small-pill" onclick={() => applyCommonChoices('yesno')}>Ja/Nein</button>
					</div>

					<textarea id="choices" bind:value={choicesText} placeholder="z.B. 18-24\n25-34\n..."></textarea>
				</div>
			{/if}

			<div class="input-group">
				<label for="context">Zusätzlicher Kontext (optional)</label>
				<textarea id="context" bind:value={context} placeholder="z.B. Diese Frage richtet sich an Studierende..."></textarea>
			</div>

			<button class="primary-btn" disabled={improving || !questionLabel} onclick={handleImprove}>
				{improving ? 'Verbessere...' : 'Frage verbessern'}
			</button>
		</section>

		{#if !appSettings.isKeySet}
			<div class="warning-box" in:fade>
				<p>⚠️ <strong>API Key fehlt:</strong> Bitte setzen Sie Ihren OpenRouter API Key oben im Header, um alle Funktionen nutzen zu können.</p>
			</div>
		{/if}

		{#if improvedQuestion}
			<section class="results-section" in:fade>
				<h2>Verbesserte Version</h2>
				<div class="improved-box">
					<h3>{improvedQuestion.label}</h3>
					{#if improvedQuestion.choices && improvedQuestion.choices.length > 0}
						<ul class="choices-list">
							{#each improvedQuestion.choices as choice}
								<li>{choice.label}</li>
							{/each}
						</ul>
					{/if}
				</div>

				{#if traces.length > 0}
					<TraceList {traces} />
				{/if}
			</section>
		{/if}

		{#if error}
			<div class="error-box" in:fade>
				<p><strong>Fehler:</strong> {error}</p>
				<button onclick={() => error = null}>Schließen</button>
			</div>
		{/if}
	</div>
</div>

<style>
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
		margin-bottom: 3rem;
	}

	h2 {
		color: var(--color-text-primary);
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid #f0f0f0;
		padding-bottom: 0.5rem;
	}

	.input-group {
		margin-bottom: 1.5rem;
	}

	.input-group label {
		display: block;
		margin-bottom: 0.75rem;
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--color-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
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

	.common-choices-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.small-pill {
		padding: 0.3rem 0.8rem;
		border: 1px solid #e0e0e0;
		border-radius: 1rem;
		background: #f9f9f9;
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 0.2s;
	}

	.small-pill:hover {
		background: #eee;
		border-color: #ccc;
	}

	input[type="text"], textarea {
		width: 100%;
		padding: 0.85rem;
		border: 2px solid #f0f0f0;
		border-radius: 0.75rem;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	textarea {
		min-height: 80px;
	}

	input:focus, textarea:focus {
		outline: none;
		border-color: var(--color-secondary);
	}

	.primary-btn {
		width: 100%;
		padding: 1rem;
		background: var(--color-secondary);
		color: white;
		border: none;
		border-radius: 1rem;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s, opacity 0.2s;
	}

	.primary-btn:hover {
		opacity: 0.9;
		transform: translateY(-2px);
	}

	.primary-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	.improved-box {
		background: #f8faff;
		padding: 2rem;
		border-radius: 1.5rem;
		border: 2px solid var(--color-secondary);
		margin-bottom: 2rem;
	}

	.improved-box h3 {
		margin-top: 0;
		color: var(--color-text-primary);
	}

	.choices-list {
		list-style: disc;
		padding-left: 1.5rem;
		margin-bottom: 0;
	}

	.choices-list li {
		margin-bottom: 0.5rem;
		color: #444;
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
</style>
