import type { TripDay } from '$lib/entities/TripDay';

interface Trip {
	id: string;
	name: string;
	start: string;
	end: string;
	user: string;
	days: TripDay[];
}

export type { Trip };
