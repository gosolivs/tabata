export function getStorage(key: string): string | null {
	return localStorage.getItem(key);
}

export function setStorage(key: string, value: string): void {
	localStorage.setItem(key, value);
}
