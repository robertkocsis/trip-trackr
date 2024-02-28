import type { TripDay } from '$lib/entities/Day';

interface Trip {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	days: TripDay[];
}

export type { Trip };
