import type { Day } from '$lib/entities/Day';

interface Trip {
	id: string;
	name: string;
	days: Day[];
}

export type { Trip };
