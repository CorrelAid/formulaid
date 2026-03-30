<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import { liabilityHtml } from 'virtual:cdl-content';
</script>

<svelte:head>
	<title>{$t('imprint.title')}</title>
</svelte:head>

<main>
	<div class="container">
		<a href="/" class="back-link">&larr; {$t('page.title')}</a>
		<h1>{$t('imprint.title')}</h1>

		<section>
			<p>
				{$t('imprint.hostedBy')} <a href="https://correlaid.org" target="_blank" rel="noopener noreferrer">{$t('imprint.correlaid')}</a>{$t('imprint.partOfCdl')} <a href="https://civic-data.de" target="_blank" rel="noopener noreferrer">{$t('imprint.cdl')}</a>.
				{$t('imprint.referenceText')} <a href="https://civic-data.de/impressum/" target="_blank" rel="noopener noreferrer">civic-data.de/impressum/</a>.
			</p>
		</section>

		{@html liabilityHtml[$locale]}
	</div>
</main>

<style>
	main {
		max-width: var(--dimension-content-max-width);
		margin: 0 auto;
		padding: var(--spacing-xl) var(--spacing-lg);
	}

	h1 {
		margin: 0 0 var(--spacing-lg) 0;
		color: var(--color-text-primary);
	}

	p {
		margin-bottom: var(--spacing-base);
		line-height: var(--line-height-relaxed);
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--spacing-base);
		color: var(--color-text-primary);
		text-decoration: none;
		font-size: 0.9rem;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	a {
		color: var(--color-text-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	a:hover {
		opacity: 0.8;
	}
</style>
