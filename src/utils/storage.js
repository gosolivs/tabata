/**
 * @param key {string}
 * @return {string}
 */
export function getStorage(key) {
	return localStorage.getItem(key);
}

/**
 * @param key {string}
 * @param value {string|number}
 */
export function setStorage(key, value) {
	localStorage.setItem(key, value);
}
