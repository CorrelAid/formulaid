<script lang="ts">
	import favicon from '@correlaid/cdl-design/favicons/favicon.svg';
	import '$lib/styles/main.css';
	import { appSettings } from '$lib/settings.svelte';
	import { PROVIDERS, getProvider, type ProviderId } from '$lib/constants';
	import { locale, t, type Locale } from '$lib/i18n';
	import { get } from 'svelte/store';
	import { LanguageSwitcher } from '@correlaid/cdl-design';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	let { children } = $props();

	let showSettings = $state(false);
	let localKey = $state(appSettings.apiKey);
	let localMode = $state(appSettings.storageMode);
	let localProvider = $state<ProviderId>(appSettings.provider);
	let localCustomUrl = $state(appSettings.customBaseUrl);
	let isValidating = $state(false);
	let validationError = $state<string | null>(null);
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	const locales = [
		{ code: 'en', label: 'EN' },
		{ code: 'de', label: 'DE' }
	];

	function resolvedBaseUrl(): string {
		return localProvider === 'custom'
			? localCustomUrl.replace(/\/+$/, '')
			: getProvider(localProvider).baseUrl;
	}

	/**
	 * OpenRouter keys are checked against `/key`, which also exposes the credit
	 * limit — this app insists on a capped key so a leaked one cannot run up a
	 * bill. Other providers have no such endpoint, so the key is checked by
	 * listing models instead.
	 */
	async function validateAndSave() {
		if (!localKey) return;
		if (localProvider === 'custom' && !localCustomUrl.trim()) {
			validationError = get(t)('header.customUrlMissing');
			return;
		}
		isValidating = true;
		validationError = null;
		try {
			if (localProvider === 'openrouter') {
				const response = await fetch('/api/v1/key', {
					headers: { Authorization: `Bearer ${localKey}` }
				});
				if (!response.ok) throw new Error(get(t)('header.apiKeyError'));

				const data = await response.json();
				const limit = data?.data?.limit;
				if (limit === null || limit === undefined) throw new Error(get(t)('header.apiKeyNoLimit'));
				if (limit > 5) throw new Error(get(t)('header.apiKeyLimitTooHigh'));
			} else {
				let response: Response;
				try {
					response = await fetch(`${resolvedBaseUrl()}/models`, {
						headers: { Authorization: `Bearer ${localKey}` }
					});
				} catch {
					// A custom endpoint is called directly from the browser, so a
					// network-level failure is almost always a missing CORS header.
					throw new Error(get(t)('header.endpointUnreachable'));
				}
				if (!response.ok) throw new Error(get(t)('header.apiKeyError'));
			}

			appSettings.setProvider(localProvider, localCustomUrl.trim());
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
		localProvider = appSettings.provider;
		localCustomUrl = appSettings.customBaseUrl;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
	<div class="top-bar">
		<button
			class="settings-toggle"
			class:needs-key={mounted && !appSettings.isKeySet}
			onclick={() => (showSettings = !showSettings)}
		>
			{#if mounted && appSettings.isKeySet}
				<span class="status-dot success"></span>
				{$t('header.apiKeySet')} · {getProvider(appSettings.provider).label}
			{:else}
				<span class="status-dot error"></span>
				{$t('header.apiKeyMissing')}
			{/if}
		</button>
		<LanguageSwitcher
			{locales}
			currentLocale={$locale}
			onLocaleChange={(code) => locale.set(code as Locale)}
		/>
	</div>

	{#if showSettings}
		<div class="settings-overlay" onclick={() => (showSettings = false)} role="presentation"></div>
		<div class="settings-dropdown" in:fade={{ duration: 150 }}>
			<div class="dropdown-header">
				<h3>{$t('header.settingsTitle')}</h3>
				<button class="close-btn" onclick={() => (showSettings = false)}>&times;</button>
			</div>

			<div class="input-group">
				<label for="header-provider">{$t('header.providerLabel')}</label>
				<select id="header-provider" bind:value={localProvider}>
					{#each PROVIDERS as p (p.id)}
						<option value={p.id}>{p.label}</option>
					{/each}
				</select>
				{#if localProvider === 'custom'}
					<input
						class="custom-url"
						type="url"
						bind:value={localCustomUrl}
						placeholder="https://my-gateway.example/v1"
					/>
					<p class="key-hint">{$t('header.customUrlHint')}</p>
				{:else}
					<p class="key-hint">
						{$t('header.providerKeyHint')}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external provider URL -->
						<a href={getProvider(localProvider).keysUrl} target="_blank" rel="noopener"
							>{getProvider(localProvider).keysUrl}</a
						>
					</p>
				{/if}
			</div>

			<div class="input-group">
				<label for="header-apikey">{$t('header.apiKeyLabel')}</label>
				<input
					id="header-apikey"
					type="password"
					bind:value={localKey}
					placeholder={localProvider === 'openrouter' ? 'sk-or-...' : 'sk-...'}
				/>
				{#if localProvider === 'openrouter'}
					<p class="key-hint">{$t('header.openRouterLimitHint')}</p>
				{/if}
			</div>

			<div class="input-group">
				<span class="setting-label">{$t('header.storageLabel')}</span>
				<div class="options-mini">
					<button
						class="mini-pill"
						class:selected={localMode === 'ram'}
						onclick={() => (localMode = 'ram')}
					>
						{$t('header.ram')}
					</button>
					<button
						class="mini-pill"
						class:selected={localMode === 'timed'}
						onclick={() => (localMode = 'timed')}
					>
						{$t('header.timed')}
					</button>
				</div>
			</div>

			{#if validationError}
				<p class="mini-error">{validationError}</p>
			{/if}

			<div class="dropdown-actions">
				<button class="save-btn" disabled={!localKey || isValidating} onclick={validateAndSave}>
					{isValidating ? '...' : $t('header.save')}
				</button>
			</div>
		</div>
	{/if}

	<div class="main-content">
		{@render children()}
	</div>

	<footer>
		<div class="footer-inner">
			<nav>
				<a href={resolve('/imprint')}>{$t('layout.imprint')}</a>
			</nav>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: var(--font-family-body);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		line-height: var(--line-height-relaxed);
	}

	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.top-bar {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-lg) 0;
	}

	.settings-toggle {
		background: var(--color-white);
		border: 1px solid var(--color-text-primary);
		padding: 0.35rem 0.75rem;
		border-radius: var(--radius-base);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: 0.85rem;
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
		transition: background 0.2s;
	}

	.settings-toggle:hover {
		background: #f0ecf0;
	}

	/* Without a key nothing works, so the entry point should be impossible to
	   miss rather than a quiet grey pill. */
	.settings-toggle.needs-key {
		background: var(--color-secondary, #b3005b);
		color: var(--color-white, #fff);
		border-color: var(--color-secondary, #b3005b);
		animation: key-pulse 2.2s ease-in-out infinite;
	}

	.settings-toggle.needs-key:hover {
		background: var(--color-secondary, #b3005b);
		opacity: 0.9;
	}

	@keyframes key-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(179, 0, 91, 0.45);
		}
		50% {
			box-shadow: 0 0 0 6px rgba(179, 0, 91, 0);
		}
	}

	.settings-dropdown select,
	.settings-dropdown .custom-url {
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem;
		border: 1px solid var(--color-text-primary);
		border-radius: var(--radius-base);
		font-family: inherit;
		font-size: 0.9rem;
	}

	.settings-dropdown .custom-url {
		margin-top: var(--spacing-xs);
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: var(--radius-full);
		flex-shrink: 0;
	}

	.status-dot.success {
		background: #10b981;
	}

	.status-dot.error {
		background: #ef4444;
	}

	.settings-overlay {
		position: fixed;
		inset: 0;
		z-index: 99;
	}

	.settings-dropdown {
		position: fixed;
		top: 3.5rem;
		right: var(--spacing-lg);
		background: var(--color-white);
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-xl);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		padding: var(--spacing-lg);
		width: 320px;
		z-index: 100;
	}

	.dropdown-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
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
		color: var(--color-text-primary);
		opacity: 0.6;
	}

	.close-btn:hover {
		opacity: 1;
	}

	.input-group {
		margin-bottom: var(--spacing-base);
	}

	.input-group label {
		display: block;
		font-size: 0.75rem;
		text-transform: uppercase;
		font-weight: var(--font-weight-bold);
		color: var(--color-secondary);
		margin-bottom: var(--spacing-xs);
		letter-spacing: var(--letter-spacing-wider);
	}

	input[type='password'] {
		width: 100%;
		padding: 0.6rem;
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-md);
		font-size: 0.9rem;
		font-family: var(--font-family-mono);
	}

	input[type='password']:focus {
		outline: none;
		border-color: var(--color-secondary);
	}

	.options-mini {
		display: flex;
		gap: 0;
	}

	.mini-pill {
		flex: 1;
		padding: 0.4rem;
		border: 1px solid var(--color-text-primary);
		background: var(--color-white);
		font-size: 0.75rem;
		cursor: pointer;
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
	}

	.mini-pill:first-child {
		border-radius: var(--radius-base) 0 0 var(--radius-base);
		border-right: none;
	}

	.mini-pill:last-child {
		border-radius: 0 var(--radius-base) var(--radius-base) 0;
	}

	.mini-pill.selected {
		background: var(--color-text-primary);
		color: var(--color-white);
	}

	.save-btn {
		width: 100%;
		padding: 0.75rem;
		background: var(--color-text-primary);
		color: var(--color-text-secondary);
		border: none;
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-semibold);
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.save-btn:hover:not(:disabled) {
		opacity: 0.9;
	}

	.save-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.key-hint {
		margin: var(--spacing-xs) 0 0;
		font-size: 0.75rem;
		opacity: 0.55;
		color: var(--color-text-primary);
	}

	.mini-error {
		color: #ef4444;
		font-size: 0.8rem;
		margin-bottom: var(--spacing-base);
	}

	.main-content {
		flex: 1;
	}

	footer {
		padding: var(--spacing-base) 0;
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-lg);
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	footer nav {
		display: flex;
		gap: var(--spacing-lg);
	}

	footer a {
		color: var(--color-text-primary);
		text-decoration: none;
		font-size: 0.875rem;
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	footer a:hover {
		opacity: 1;
	}
</style>
