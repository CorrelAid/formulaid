<script lang="ts">
	import { fade } from 'svelte/transition';
	import { searchQuestions } from '$lib/db';
	import { appSettings } from '$lib/settings.svelte.ts';

	let { 
		conn, 
		apiKey, 
		researchQuestion = $bindable(''),
		contextResults = $bindable([]),
		searching = $bindable(false),
		onSearchError
	} = $props<{
		conn: any,
		apiKey?: string,
		researchQuestion?: string,
		contextResults?: any[],
		searching?: boolean,
		onSearchError?: (error: string) => void
	}>();

	let effectiveApiKey = $derived(apiKey || appSettings.apiKey);

	async function handleSearch() {
		if (!conn || !researchQuestion || !effectiveApiKey) return;
		searching = true;
		try {
			contextResults = await searchQuestions(conn, researchQuestion, effectiveApiKey);
		} catch (e) {
			console.error(e);
			onSearchError?.((e as Error).message);
		} finally {
			searching = false;
		}
	}
</script>

<div class="search-container">
	<div class="input-wrapper">
		<textarea 
			bind:value={researchQuestion} 
			placeholder="Beschreiben Sie Ihr Forschungsziel, um passende Fragen zu finden..."
		></textarea>
		<button 
			class="search-btn" 
			onclick={handleSearch} 
			disabled={searching || !researchQuestion || !effectiveApiKey}
		>
			{#if searching}
				<span class="spinner-mini"></span>
			{:else}
				Suchen
			{/if}
		</button>
	</div>

	{#if searching}
		<div class="search-status">Suche passende Fragen...</div>
	{/if}

	<div class="results-grid">
		{#if contextResults.length > 0}
			<div class="results-column" in:fade>
				<h3>Gefundene Fragen ({contextResults.length})</h3>
				<div class="results-list">
					{#each contextResults as result (result.question_id)}
						<div class="result-card">
							<div class="result-header">
								<span class="study-tag">{result.study}</span>
								<span class="score-tag">
									Score: {typeof result.combined_score === 'number' ? result.combined_score.toFixed(2) : 'N/A'}
								</span>
							</div>
							<p class="question-text">{result.question_text}</p>
							{#if result.answer_options_text}
								<div class="options-preview">
									<strong>Optionen:</strong> {result.answer_options_text.split('\n').join(', ')}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.search-container {
		width: 100%;
	}

	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	textarea {
		width: 100%;
		padding: 1rem;
		border: 2px solid #f0f0f0;
		border-radius: 1rem;
		font-size: 1.1rem;
		transition: border-color 0.2s;
		min-height: 120px;
		font-family: inherit;
		resize: vertical;
	}

	textarea:focus {
		outline: none;
		border-color: var(--color-secondary);
		box-shadow: 0 0 0 4px rgba(91, 146, 246, 0.1);
	}

	.search-btn {
		background: var(--color-secondary);
		color: white;
		border: none;
		padding: 0.75rem 2rem;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 3rem;
	}

	.search-btn:hover:not(:disabled) {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.search-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.spinner-mini {
		width: 1.25rem;
		height: 1.25rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.search-status {
		font-size: 0.9rem;
		color: var(--color-secondary);
		margin-bottom: 1.5rem;
		font-style: italic;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.results-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	h3 {
		font-size: 1.1rem;
		color: var(--color-text-primary);
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.results-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.result-card {
		background: #f8faff;
		border: 1px solid #eef2ff;
		padding: 1.25rem;
		border-radius: 0.75rem;
		transition: transform 0.2s;
	}

	.result-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-secondary);
	}

	.result-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.study-tag {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: #e0e7ff;
		color: #4338ca;
		padding: 0.2rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 700;
	}

	.score-tag {
		font-size: 0.75rem;
		color: #94a3b8;
		font-family: var(--font-family-mono);
	}

	.question-text {
		font-size: 1rem;
		line-height: 1.5;
		margin: 0 0 0.75rem 0;
		color: var(--color-text-primary);
		font-weight: 500;
	}

	.options-preview {
		font-size: 0.85rem;
		color: #64748b;
		background: rgba(255, 255, 255, 0.5);
		padding: 0.5rem;
		border-radius: 0.4rem;
	}

	.options-preview strong {
		color: #475569;
	}
</style>
