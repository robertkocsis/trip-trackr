import type { Day } from '$lib/entities/Day';

interface Trip {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	days: Day[];
}

export type { Trip };
