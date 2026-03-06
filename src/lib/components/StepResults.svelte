<script lang="ts">
	import { fade } from 'svelte/transition';
	import TraceList from './TraceList.svelte';

	let { 
		aiLoading, 
		aiStatus, 
		traces, 
		onGenerate, 
		onDownload,
		onReset,
		generatedFile
	} = $props<{
		aiLoading: boolean,
		aiStatus: string,
		traces: any[],
		onGenerate: () => void,
		onDownload: () => void,
		onReset: () => void,
		generatedFile: string | null
	}>();
</script>

<section class="results-section">
	<h2>4. Generierung & Export</h2>
	
	<div class="actions">
		{#if generatedFile}
			<button class="secondary-btn" onclick={onReset} disabled={aiLoading}>
				Neu generieren
			</button>
			<button 
				class="primary-btn" 
				onclick={onDownload}
				disabled={aiLoading}
			>
				Datei herunterladen
			</button>
		{:else}
			<button 
				class="primary-btn" 
				onclick={onGenerate}
				disabled={aiLoading}
			>
				{aiLoading ? aiStatus : 'Umfrage mit KI generieren'}
			</button>
		{/if}
	</div>

	{#if generatedFile}
		<div class="success-alert" in:fade>
			<p>✅ <strong>Umfrage verarbeitet!</strong> Die XLSForm wurde generiert.</p>
		</div>
	{/if}

	<TraceList {traces} />
</section>

<style>
	.results-section {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 2px solid var(--color-tertiary);
	}

	h2 {
		color: var(--color-text-primary, #333);
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.primary-btn, .secondary-btn {
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.2s;
		border: none;
		flex-grow: 1;
	}

	.primary-btn {
		background: var(--color-secondary, #5b92f6);
		color: white;
	}

	.secondary-btn {
		background: #f0f0f0;
		color: #333;
		border: 1px solid #ddd;
	}

	.primary-btn:disabled, .secondary-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.success-alert {
		background: #f0fff4;
		border: 1px solid #68d391;
		padding: 1rem;
		border-radius: 0.75rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.success-alert p {
		margin: 0;
		color: #2f855a;
	}
</style>
