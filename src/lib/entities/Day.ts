import type { Activity } from '$lib/entities/Activity';

interface Day {
	id: string;
	date: string;
	name: string;
	activities: Activity[];
}

export type { Day };
