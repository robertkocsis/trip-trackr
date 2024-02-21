import type { Activity } from '$lib/entities/Activity';

interface TripDay {
	id: string;
	date: string;
	name?: string;
	activities: Activity[];
}

export type { TripDay };
