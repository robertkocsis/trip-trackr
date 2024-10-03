import { z } from 'zod';

export const dayItemFormSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(2).max(50).default('New item'),
	startHours: z
		.string()
		.min(2)
		.max(2)
		.regex(/^[0-9]{2}$/)
		.optional(),
	startMinutes: z
		.string()
		.min(2)
		.max(2)
		.regex(/^[0-5][0-9]$/)
		.optional(),
	endHours: z
		.string()
		.min(2)
		.max(2)
		.regex(/^[0-9]{2}$/)
		.optional(),
	endMinutes: z
		.string()
		.min(2)
		.max(2)
		.regex(/^[0-5][0-9]$/)
		.optional(),
	description: z.string().max(1000).default('').optional(),
	cost: z.coerce.number().min(0).max(10000).optional()
});

export type TripDayItemFormSchema = typeof dayItemFormSchema;
