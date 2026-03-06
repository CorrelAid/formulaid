<script lang="ts">
	import favicon from '@correlaid/cdl-design/favicons/favicon.svg';
	import '$lib/styles/main.css';
	import { appSettings } from '$lib/settings.svelte.ts';
	import { fade } from 'svelte/transition';

	let { children } = $props();

	let showSettings = $state(false);
	let localKey = $state(appSettings.apiKey);
	let localMode = $state(appSettings.storageMode);
	let isValidating = $state(false);
	let validationError = $state<string | null>(null);

	async function validateAndSave() {
		if (!localKey) return;
		isValidating = true;
		validationError = null;
		try {
			const response = await fetch('/api/v1/key', {
				headers: { Authorization: `Bearer ${localKey}` }
			});
			if (!response.ok) throw new Error('API Key Validierung fehlgeschlagen.');
			
			appSettings.setKey(localKey, localMode);
			showSettings = false;
		} catch (e) {
			validationError = (e as Error).message;
		} finally {
			isValidating = false;
		}
	}

	$effect(() => {
		localKey = appSettings.apiKey;
		localMode = appSettings.storageMode;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="main-header">
	<div class="header-content">
		<a href="/" class="logo">Formulaid</a>
		<div class="header-actions">
			<button class="settings-toggle" onclick={() => showSettings = !showSettings}>
				{#if appSettings.isKeySet}
					<span class="status-indicator success"></span>
					API Key gesetzt
				{:else}
					<span class="status-indicator error"></span>
					API Key fehlt
				{/if}
			</button>
		</div>
	</div>

	{#if showSettings}
		<div class="settings-dropdown" in:fade={{ duration: 150 }}>
			<div class="dropdown-header">
				<h3>OpenRouter Einstellungen</h3>
				<button class="close-btn" onclick={() => showSettings = false}>×</button>
			</div>
			
			<div class="input-group">
				<label for="header-apikey">API Key</label>
				<input 
					id="header-apikey" 
					type="password" 
					bind:value={localKey} 
					placeholder="sk-or-..." 
				/>
			</div>

			<div class="input-group">
				<label>Speichermodus</label>
				<div class="options-mini">
					<button 
						class="mini-pill" 
						class:selected={localMode === 'ram'} 
						onclick={() => localMode = 'ram'}
					>
						RAM
					</button>
					<button 
						class="mini-pill" 
						class:selected={localMode === 'timed'} 
						onclick={() => localMode = 'timed'}
					>
						1h persistent
					</button>
				</div>
			</div>

			{#if validationError}
				<p class="mini-error">{validationError}</p>
			{/if}

			<div class="dropdown-actions">
				<button 
					class="save-btn" 
					disabled={!localKey || isValidating} 
					onclick={validateAndSave}
				>
					{isValidating ? '...' : 'Speichern & Validieren'}
				</button>
			</div>
		</div>
	{/if}
</header>

<main>
	{@render children()}
</main>

<style>
	.main-header {
		background: white;
		border-bottom: 1px solid var(--color-tertiary);
		padding: 1rem 2rem;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-family: var(--font-family-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text-primary);
		text-decoration: none;
	}

	.settings-toggle {
		background: #f8faff;
		border: 1px solid var(--color-tertiary);
		padding: 0.5rem 1rem;
		border-radius: 2rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.settings-toggle:hover {
		background: #f0f4ff;
		border-color: var(--color-secondary);
	}

	.status-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.status-indicator.success {
		background: #10b981;
		box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
	}

	.status-indicator.error {
		background: #ef4444;
		box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
	}

	.settings-dropdown {
		position: absolute;
		top: calc(100% + 1rem);
		right: 2rem;
		background: white;
		border: 1px solid var(--color-tertiary);
		border-radius: 1rem;
		box-shadow: 0 10px 25px rgba(0,0,0,0.1);
		padding: 1.5rem;
		width: 320px;
	}

	.dropdown-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.dropdown-header h3 {
		margin: 0;
		font-size: 1rem;
		color: var(--color-text-primary);
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #999;
	}

	.input-group {
		margin-bottom: 1.25rem;
	}

	.input-group label {
		display: block;
		font-size: 0.75rem;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--color-secondary);
		margin-bottom: 0.5rem;
		letter-spacing: 0.05em;
	}

	input[type="password"] {
		width: 100%;
		padding: 0.6rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		font-size: 0.9rem;
	}

	.options-mini {
		display: flex;
		gap: 0.5rem;
	}

	.mini-pill {
		flex: 1;
		padding: 0.4rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.4rem;
		background: white;
		font-size: 0.75rem;
		cursor: pointer;
		font-weight: 500;
	}

	.mini-pill.selected {
		background: var(--color-secondary);
		color: white;
		border-color: var(--color-secondary);
	}

	.save-btn {
		width: 100%;
		padding: 0.75rem;
		background: var(--color-secondary);
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
	}

	.save-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.mini-error {
		color: #ef4444;
		font-size: 0.8rem;
		margin-bottom: 1rem;
	}

	main {
		min-height: calc(100vh - 70px);
	}
</style>
