import type { DayItem } from '$lib/entities/DayItem';

interface TripDay {
	id: string;
	date: string;
	name: string;
	items: DayItem[];
}

export type { TripDay };
