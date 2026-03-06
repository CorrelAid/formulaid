import { saveKey as persistKey, loadKey as fetchKey, type StorageMode } from './storage';

class AppSettings {
	apiKey = $state('');
	storageMode = $state<StorageMode>('ram');
	isKeySet = $state(false);

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

	load() {
		const saved = fetchKey();
		if (saved) {
			this.apiKey = saved.key;
			this.storageMode = saved.mode;
			this.isKeySet = true;
		}
	}

	clear() {
		this.apiKey = '';
		this.isKeySet = false;
		persistKey('', 'ram');
	}
}

export const appSettings = new AppSettings();
