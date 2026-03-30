<script lang="ts">
	import TraceList from './TraceList.svelte';
	import { t } from '$lib/i18n';

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
	<div class="actions">
		{#if generatedFile}
			<button class="secondary-btn" onclick={onReset} disabled={aiLoading}>
				{$t('wizard.generateNew')}
			</button>
			<button
				class="primary-btn"
				onclick={onDownload}
				disabled={aiLoading}
			>
				{$t('wizard.downloadFile')}
			</button>
		{:else}
			<button
				class="primary-btn"
				onclick={onGenerate}
				disabled={aiLoading}
			>
				{aiLoading ? aiStatus : $t('wizard.generateBtn')}
			</button>
		{/if}
	</div>

	{#if generatedFile}
		<div class="success-alert">
			<p>{$t('wizard.generated')}</p>
		</div>
	{/if}

	<TraceList {traces} />
</section>

<style>
	.results-section {
		background: var(--color-white);
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
	}

	.actions {
		display: flex;
		gap: var(--spacing-sm);
	}

	.primary-btn, .secondary-btn {
		padding: 0.75rem var(--spacing-lg);
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-semibold);
		cursor: pointer;
		transition: opacity 0.2s;
		border: var(--dimension-border-width) solid var(--color-text-primary);
		flex-grow: 1;
	}

	.primary-btn {
		background: var(--color-text-primary);
		color: var(--color-text-secondary);
	}

	.primary-btn:hover:not(:disabled) {
		opacity: 0.9;
	}

	.secondary-btn {
		background: var(--color-white);
		color: var(--color-text-primary);
	}

	.secondary-btn:hover:not(:disabled) {
		background: color-mix(in srgb, var(--color-tertiary) 30%, white);
	}

	.primary-btn:disabled, .secondary-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.success-alert {
		background: var(--color-tertiary);
		padding: var(--spacing-sm) var(--spacing-base);
		border-radius: var(--radius-md);
		margin-top: var(--spacing-sm);
	}

	.success-alert p {
		margin: 0;
		color: var(--color-text-primary);
		font-weight: var(--font-weight-medium);
	}
</style>
