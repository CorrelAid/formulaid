import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { cdlTokens } from '@correlaid/cdl-design/vite-plugin';
import type { Plugin } from 'vite';

function fetchCdlContent(): Plugin {
	const virtualModuleId = 'virtual:cdl-content';
	const resolvedId = '\0' + virtualModuleId;

	async function fetchSnippet(snippetId: string, lang: string): Promise<string> {
		const headers: Record<string, string> = { Accept: 'application/vnd.github.raw+json' };
		if (process.env.GITHUB_TOKEN) headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
		try {
			const res = await fetch(
				`https://api.github.com/repos/CorrelAid/cdl-wp-eins/contents/src/content/snippets/${snippetId}/${lang}.html`,
				{ headers }
			);
			if (!res.ok) throw new Error(`${res.status}`);
			return res.text();
		} catch (e) {
			console.warn(`[fetch-cdl-content] Could not fetch ${snippetId}/${lang}.html:`, e);
			return '';
		}
	}

	return {
		name: 'fetch-cdl-content',
		resolveId(id) {
			if (id === virtualModuleId) return resolvedId;
		},
		async load(id) {
			if (id !== resolvedId) return;
			const [descEn, descDe, liabilityEn, liabilityDe] = await Promise.all([
				fetchSnippet('formulaid', 'en'),
				fetchSnippet('formulaid', 'de'),
				fetchSnippet('liability', 'en'),
				fetchSnippet('liability', 'de')
			]);
			return [
				`export const descriptionHtml = ${JSON.stringify({ en: descEn, de: descDe })};`,
				`export const liabilityHtml = ${JSON.stringify({ en: liabilityEn, de: liabilityDe })};`
			].join('\n');
		}
	};
}

export default defineConfig({
	plugins: [fetchCdlContent(), cdlTokens(), sveltekit()],
	server: {
		fs: {
			allow: ['..']
		},
		proxy: {
			'/api/v1': {
				target: 'https://openrouter.ai',
				changeOrigin: true,
				secure: true
			}
		},
		headers: {
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin'
		}
	},
	preview: {
		headers: {
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin'
		}
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
