import type { Action } from 'svelte/action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce(fn: (...args: any[]) => any, delay: number = 300): Action {
	let timer: number;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (...params: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...params);
		}, delay);
	};
}
