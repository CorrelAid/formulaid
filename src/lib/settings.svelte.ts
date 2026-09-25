import { saveKey as persistKey, loadKey as fetchKey, type StorageMode } from './storage';
import { DEFAULT_PROVIDER, getProvider, type ProviderId } from './constants';

const PROVIDER_KEY = 'formulaid_provider';
const CUSTOM_URL_KEY = 'formulaid_custom_base_url';
/** Model names differ per provider (OpenRouter prefixes the vendor), so each
 *  provider remembers its own (#29). */
const modelKey = (provider: ProviderId) => `formulaid_model_${provider}`;

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

	/** Model name per provider, as typed; missing or empty means the default. */
	models = $state<Partial<Record<ProviderId, string>>>({});

	/** What the model field shows for the active provider. */
	get modelInput(): string {
		return this.models[this.provider] ?? getProvider(this.provider).defaultModel;
	}

	/** The model to call: the one last used with the active provider, or its default. */
	get model(): string {
		return this.models[this.provider]?.trim() || getProvider(this.provider).defaultModel;
	}

	/** Remember `model` for the active provider. The default is stored as "no
	 *  choice", so a later change of the default reaches everyone who never
	 *  picked one. */
	setModel(model: string) {
		const name = model.trim();
		const key = modelKey(this.provider);
		this.models[this.provider] = model;
		if (!name || name === getProvider(this.provider).defaultModel) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, name);
		}
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
		const provider = localStorage.getItem(PROVIDER_KEY);
		if (provider === 'openrouter' || provider === 'custom') {
			this.provider = provider;
		} else if (provider) {
			// A provider that was removed (EUrouter, #32): its key belongs to it,
			// so don't send it to the default provider; ask for a new one.
			localStorage.removeItem(PROVIDER_KEY);
			localStorage.removeItem(modelKey(provider as ProviderId));
			this.clear();
		}
		this.customBaseUrl = localStorage.getItem(CUSTOM_URL_KEY) ?? '';
		for (const id of ['openrouter', 'custom'] as const) {
			const saved = localStorage.getItem(modelKey(id));
			if (saved) this.models[id] = saved;
		}
	}

	clear() {
		this.apiKey = '';
		this.isKeySet = false;
		persistKey('', 'ram');
	}
}

export const appSettings = new AppSettings();
