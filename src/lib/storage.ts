export type StorageMode = 'ram' | 'timed';

export interface StoredKey {
	key: string;
	expiresAt: number;
}

const STORAGE_KEY = 'formulaid_api_key_secure';

export function saveKey(key: string, mode: StorageMode, durationMinutes: number = 60) {
	// Always clear any existing persistent storage first
	localStorage.removeItem(STORAGE_KEY);
	sessionStorage.removeItem('formulaid_api_key'); // Cleanup old legacy key if any

	if (mode === 'timed') {
		const expiresAt = Date.now() + durationMinutes * 60 * 1000;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ key, expiresAt }));
	}
	// 'ram' mode stays in JS memory (handled by component state)
}

export function loadKey(): { key: string, mode: StorageMode } | null {
	const data = localStorage.getItem(STORAGE_KEY);
	if (!data) return null;

	try {
		const { key, expiresAt } = JSON.parse(data) as StoredKey;
		if (Date.now() < expiresAt) {
			return { key, mode: 'timed' };
		} else {
			// Explicit self-destruct if expired
			localStorage.removeItem(STORAGE_KEY);
		}
	} catch (e) {
		localStorage.removeItem(STORAGE_KEY);
	}

	return null;
}

export function clearAllStorage() {
	localStorage.removeItem(STORAGE_KEY);
	sessionStorage.removeItem('formulaid_api_key');
}
