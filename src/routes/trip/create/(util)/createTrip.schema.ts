import { z } from 'zod';

export const createTripSchema = z.object({
	name: z
		.string()
		.min(3, 'Name must be at least 3 characters')
		.max(50, 'Name must be at most 50 characters'),
	start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid start date'),
	end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid end date'),
	description: z.string().max(500, 'Description must be at most 500 characters').optional()
});

export type CreateTripSchema = typeof createTripSchema;
