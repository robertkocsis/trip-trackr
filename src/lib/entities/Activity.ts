import type { Cost } from "$lib/entities/Cost";

interface Activity {
    id: string;
    name: string;
    duration: number;
    cost?: Cost;
    notes?: string;
}

export type { Activity };
