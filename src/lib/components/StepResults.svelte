<script lang="ts">
	import TraceList from './TraceList.svelte';
	import { t } from '$lib/i18n';
	import type { Trace } from '$lib/agents/types';

	let {
		aiLoading,
		aiStatus,
		progress,
		traces,
		onGenerate,
		onCancel,
		onDownload,
		onReset,
		onResetInputs,
		hasFile
	} = $props<{
		aiLoading: boolean;
		aiStatus: string;
		progress: number;
		traces: Trace[];
		onGenerate: () => void;
		onCancel: () => void;
		onDownload: () => void;
		onReset: () => void;
		onResetInputs: () => void;
		hasFile: boolean;
	}>();
</script>

<section class="results-section">
	{#if hasFile}
		<!-- The result is a draft, however finished it looks (#35). -->
		<div class="draft-notice" role="note">
			<p><strong>{$t('wizard.draftHeading')}</strong> {$t('wizard.draftText')}</p>
			<p>
				{$t('wizard.draftCheck')}
				<a href="https://umfragen.civic-data.de/pretesting" target="_blank" rel="noopener"
					>{$t('wizard.draftPretestLink')}</a
				>
			</p>
		</div>
	{/if}
	<div class="actions">
		{#if hasFile}
			<button class="secondary-btn" onclick={onReset} disabled={aiLoading}>
				{$t('wizard.generateNew')}
			</button>
			<button class="primary-btn" onclick={onDownload} disabled={aiLoading}>
				{$t('wizard.downloadFile')}
			</button>
		{:else}
			<button
				class="primary-btn"
				class:pulsing={aiLoading}
				onclick={onGenerate}
				disabled={aiLoading}
			>
				{#if aiLoading}
					<span class="spinner"></span>
				{/if}
				{aiLoading ? aiStatus : $t('wizard.generateBtn')}
			</button>
			{#if aiLoading}
				<button class="secondary-btn" onclick={onCancel}>{$t('wizard.cancel')}</button>
			{/if}
		{/if}
	</div>
	{#if !aiLoading}
		<button class="reset-inputs" onclick={onResetInputs}>{$t('wizard.resetInputs')}</button>
	{/if}

	{#if aiLoading || progress > 0}
		<div class="progress-wrap">
			<div class="progress-bar-track">
				<div
					class="progress-bar-fill"
					class:loading={aiLoading}
					class:complete={progress === 100}
					style="width: {progress}%"
				></div>
			</div>
			<span class="progress-label">{progress}%</span>
		</div>
	{/if}

	{#if hasFile}
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

	.primary-btn,
	.secondary-btn {
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

	.draft-notice {
		margin-bottom: var(--spacing-base);
		padding: var(--spacing-sm) var(--spacing-base);
		border-left: 3px solid var(--color-secondary);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--color-secondary) 8%, white);
		font-size: 0.9rem;
	}

	.draft-notice p {
		margin: 0;
	}

	.draft-notice p + p {
		margin-top: var(--spacing-xs);
	}

	.draft-notice a {
		color: var(--color-secondary);
	}

	.reset-inputs {
		display: block;
		margin: var(--spacing-sm) 0 0 auto;
		padding: 0;
		border: none;
		background: none;
		font-size: 0.85rem;
		color: var(--color-secondary);
		text-decoration: underline;
		cursor: pointer;
	}

	.primary-btn:disabled,
	.secondary-btn:disabled {
		opacity: 0.65;
		cursor: not-allowed;
	}

	.primary-btn.pulsing {
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.65;
		}
		50% {
			opacity: 0.9;
		}
	}

	.spinner {
		display: inline-block;
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: rgba(255, 255, 255, 0.9);
		border-radius: 50%;
		animation: spin 0.75s linear infinite;
		vertical-align: middle;
		margin-right: 0.4em;
		flex-shrink: 0;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.progress-wrap {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-sm);
	}

	.progress-bar-track {
		flex: 1;
		height: 10px;
		background: color-mix(in srgb, var(--color-secondary) 18%, white);
		border-radius: 99px;
		overflow: hidden;
	}

	.progress-bar-fill {
		height: 100%;
		border-radius: 99px;
		background: var(--color-secondary);
		transition: width 0.6s ease;
		position: relative;
		overflow: hidden;
	}

	.progress-bar-fill.loading::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			transparent 20%,
			rgba(255, 255, 255, 0.55) 50%,
			transparent 80%
		);
		animation: shimmer 1.2s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(200%);
		}
	}

	.progress-label {
		font-size: 0.8rem;
		font-weight: var(--font-weight-semibold);
		color: var(--color-secondary);
		min-width: 2.5rem;
		text-align: right;
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
