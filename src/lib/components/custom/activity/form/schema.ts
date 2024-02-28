import { z } from 'zod';

export const activityFormSchema = z.object({
	name: z.string().min(2).max(50),
	description: z.string().max(1000).default(''),
	cost: z.coerce.number().positive().max(1000000)
});

export type ActivityFormSchema = typeof activityFormSchema;
