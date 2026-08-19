import { saveKey as persistKey, loadKey as fetchKey, type StorageMode } from './storage';
import { DEFAULT_PROVIDER, getProvider, type ProviderId } from './constants';

const PROVIDER_KEY = 'formulaid_provider';
const CUSTOM_URL_KEY = 'formulaid_custom_base_url';

class AppSettings {
	apiKey = $state('');
	storageMode = $state<StorageMode>('ram');
	isKeySet = $state(false);
	provider = $state<ProviderId>(DEFAULT_PROVIDER);
	/** Only used when `provider === 'custom'`. Not a secret, so it persists. */
	customBaseUrl = $state('');

	constructor() {
		// Initialize from storage on creation if possible (client-side)
		if (typeof window !== 'undefined') {
			this.load();
		}
	}

	setKey(key: string, mode: StorageMode) {
		this.apiKey = key;
		this.storageMode = mode;
		this.isKeySet = !!key;
		persistKey(key, mode);
	}

	setProvider(provider: ProviderId, customBaseUrl = '') {
		this.provider = provider;
		this.customBaseUrl = customBaseUrl;
		localStorage.setItem(PROVIDER_KEY, provider);
		localStorage.setItem(CUSTOM_URL_KEY, customBaseUrl);
	}

	/** Base URL for the OpenAI-compatible client, resolved for the active provider. */
	get baseUrl(): string {
		return this.provider === 'custom'
			? this.customBaseUrl.replace(/\/+$/, '')
			: getProvider(this.provider).baseUrl;
	}

	load() {
		const saved = fetchKey();
		if (saved) {
			this.apiKey = saved.key;
			this.storageMode = saved.mode;
			this.isKeySet = true;
		}
		const provider = localStorage.getItem(PROVIDER_KEY) as ProviderId | null;
		if (provider === 'openrouter' || provider === 'eurouter' || provider === 'custom') {
			this.provider = provider;
		}
		this.customBaseUrl = localStorage.getItem(CUSTOM_URL_KEY) ?? '';
	}

	clear() {
		this.apiKey = '';
		this.isKeySet = false;
		persistKey('', 'ram');
	}
}

export const appSettings = new AppSettings();
