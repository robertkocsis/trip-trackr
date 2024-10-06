import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const dayItemFormSchema = z
	.object({
		id: z.string().optional(),
		name: z.string().min(2).max(50),
		start: z
			.string()
			.regex(timeRegex, {
				message: 'Invalid time format. Use HH:MM (24-hour format).'
			})
			.optional()
			.or(z.literal('')),
		end: z
			.string()
			.regex(timeRegex, {
				message: 'Invalid time format. Use HH:MM (24-hour format).'
			})
			.optional()
			.or(z.literal('')),
		description: z.string().max(1000).default('').optional(),
		cost: z.coerce.number().min(0).max(10000).optional()
	})
	.refine(
		(data) => {
			if (data.start && !data.end) {
				return false;
			}
			return true;
		},
		{
			message: 'The end time is required if the start time is provided',
			path: ['end']
		}
	)
	.refine(
		(data) => {
			if (!data.start && data.end) {
				return false;
			}
			return true;
		},
		{
			message: 'The start time is required if the end time is provided',
			path: ['start']
		}
	)
	.refine(
		(data) => {
			if (data.start && data.end && data.start.match(timeRegex) && data.end.match(timeRegex)) {
				const [startHours, startMinutes] = data.start.split(':').map(Number);
				const [endHours, endMinutes] = data.end.split(':').map(Number);
				return startHours < endHours || (startHours === endHours && startMinutes < endMinutes);
			}
			return true;
		},
		{
			message: 'The end time should be after the start time',
			path: ['end']
		}
	);

export type TripDayItemFormSchema = typeof dayItemFormSchema;
