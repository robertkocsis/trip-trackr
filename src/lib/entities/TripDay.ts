import type { TripDayItem } from '$lib/entities/TripDayItem';

interface TripDay {
	id: string;
	date: string;
	name: string;
	items: TripDayItem[];
}

export type { TripDay };
