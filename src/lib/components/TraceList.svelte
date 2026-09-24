<script lang="ts">
	import { t } from '$lib/i18n';
	import type { Trace } from '$lib/agents/types';

	let { traces } = $props<{ traces: Trace[] }>();
</script>

{#if traces.length > 0}
	<details class="traces-section">
		<summary>Traces ({traces.length})</summary>
		<div class="traces-list">
			{#each traces as traceItem, i (i)}
				<details class="trace-item">
					<summary
						>{$t('traces.step')} {i + 1}: {traceItem?.programId || $t('traces.fallback')}</summary
					>
					<pre>{JSON.stringify(traceItem?.trace || {}, null, 2)}</pre>
				</details>
			{/each}
		</div>
	</details>
{/if}

<style>
	.traces-section {
		margin-top: var(--spacing-sm);
	}

	.traces-section > summary {
		cursor: pointer;
		font-size: 0.85rem;
		color: var(--color-text-primary);
		opacity: 0.5;
		font-weight: var(--font-weight-medium);
	}

	.traces-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-sm);
	}

	.trace-item {
		border: 1px solid color-mix(in srgb, var(--color-text-primary) 15%, white);
		border-radius: var(--radius-md);
	}

	.trace-item summary {
		padding: var(--spacing-sm);
		cursor: pointer;
		font-size: 0.8rem;
		color: var(--color-text-primary);
		opacity: 0.6;
	}

	pre {
		margin: 0;
		font-family: var(--font-family-mono);
		font-size: 0.75rem;
		padding: var(--spacing-sm);
		border-top: 1px solid color-mix(in srgb, var(--color-text-primary) 15%, white);
		white-space: pre-wrap;
		word-break: break-word;
		max-height: 300px;
		overflow-y: auto;
	}
</style>
