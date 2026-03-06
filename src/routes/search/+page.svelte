<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { initDB } from '$lib/db';
	import { appSettings } from '$lib/settings.svelte.ts';
	import QuestionSearch from '$lib/components/QuestionSearch.svelte';

	// DuckDB State
	let conn = $state<any>(null);
	let loading = $state(true);
	
	// Search State
	let researchQuestion = $state('');
	let contextResults = $state<any[]>([]);
	let searching = $state(false);
	let error = $state<string | null>(null);

	onMount(async () => {
		conn = await initDB();
		loading = false;
	});
</script>

<div class="container">
	<div class="header">
		<a href="/" class="back-link">← Zurück</a>
		<h1>Fragensuche</h1>
		<p>Suchen Sie semantisch in unserer Datenbank nach passenden Umfragefragen.</p>
	</div>

	{#if loading}
		<div class="card loading-card">
			<div class="loading-state" in:fade>
				<p>Initialisiere Suche...</p>
				<div class="spinner"></div>
			</div>
		</div>
	{:else}
		<div class="search-layout">
			<main class="main-content">
				<div class="card">
					{#if !appSettings.isKeySet}
						<div class="warning-box" in:fade>
							<p>⚠️ <strong>API Key fehlt:</strong> Setzen Sie den Key im Header für die semantische Suche.</p>
						</div>
					{/if}

					<QuestionSearch 
						{conn} 
						apiKey={appSettings.apiKey} 
						bind:researchQuestion
						bind:contextResults
						bind:searching
						onSearchError={(msg) => error = msg}
					/>
				</div>
			</main>
		</div>
	{/if}

	{#if error}
		<div class="error-box" in:fade>
			<p><strong>Fehler:</strong> {error}</p>
			<button onclick={() => error = null}>Schließen</button>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 4rem 2rem;
	}

	.header {
		margin-bottom: 3rem;
	}

	.header h1 {
		font-size: 2.5rem;
		margin: 0.5rem 0;
	}

	.header p {
		color: #666;
		font-size: 1.1rem;
	}

	.back-link {
		text-decoration: none;
		color: var(--color-secondary);
		font-weight: 500;
	}

	.card {
		background: white;
		padding: 2.5rem;
		border-radius: 1.5rem;
		box-shadow: 0 10px 25px rgba(0,0,0,0.05);
	}

	.loading-card {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
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

	.loading-state {
		padding: 2rem 0;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f0f0f0;
		border-top: 4px solid var(--color-secondary);
		border-radius: 50%;
		margin: 1.5rem auto;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.error-box {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		padding: 1rem 1.5rem;
		background: #fff5f5;
		border: 1px solid #feb2b2;
		border-radius: 0.75rem;
		color: #c53030;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.error-box button {
		background: #feb2b2;
		border: none;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		cursor: pointer;
		font-size: 0.8rem;
	}
</style>
