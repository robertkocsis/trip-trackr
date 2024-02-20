import type { Cost } from '$lib/entities/Cost';

interface Activity {
	id: string;
	name: string;
	cost?: Cost;
	description?: string;
}

export type { Activity };
