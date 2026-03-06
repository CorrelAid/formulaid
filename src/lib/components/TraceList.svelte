<script lang="ts">
	let { traces } = $props<{ traces: any[] }>();
</script>

{#if traces.length > 0}
	<div class="traces-section">
		<h3>KI-Aktivitäten (Traces)</h3>
		<div class="traces-list">
			{#each traces as traceItem, i}
				<details class="trace-item">
					<summary>Aktion {i + 1}: {traceItem?.programId || 'KI-Verarbeitung'}</summary>
					<div class="trace-content">
						<div class="trace-block">
							<strong>Data:</strong>
							<pre>{JSON.stringify(traceItem?.trace || {}, null, 2)}</pre>
						</div>
					</div>
				</details>
			{/each}
		</div>
	</div>
{/if}

<style>
	.traces-section {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 2px dashed #eee;
	}

	.traces-section h3 {
		font-size: 1.1rem;
		color: #999;
		margin-bottom: 1rem;
	}

	.traces-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.trace-item {
		background: #fcfcfc;
		border: 1px solid #f0f0f0;
		border-radius: 0.5rem;
	}

	.trace-item summary {
		padding: 0.75rem;
		cursor: pointer;
		font-size: 0.85rem;
		color: #666;
		font-weight: 500;
	}

	.trace-content {
		padding: 1rem;
		background: white;
		border-top: 1px solid #f0f0f0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		max-height: 400px;
		overflow-y: auto;
	}

	.trace-block {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.trace-block strong {
		font-size: 0.75rem;
		color: #999;
		text-transform: uppercase;
	}

	.trace-block pre {
		margin: 0;
		font-size: 0.75rem;
		background: #f9f9f9;
		padding: 0.75rem;
		border-radius: 0.5rem;
		white-space: pre-wrap;
		word-break: break-word;
	}
</style>
