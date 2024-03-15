import type { TripDay } from '$lib/entities/TripDay';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createTripSchema } from './(util)/createTrip.schema';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createTripSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		let tripId = '';

		try {
			tripId = (
				await event.locals.pb.collection('trips').create({ ...form.data, user: event.locals.id })
			).id;

			const startDate = new CalendarDate(
				...(form.data.start.split('-').map(Number) as [number, number, number])
			);

			const endDate = new CalendarDate(
				...(form.data.end.split('-').map(Number) as [number, number, number])
			);

			const days: Omit<TripDay, 'id'>[] = [];

			let i = 1;

			for (let date = startDate; date <= endDate; date = date.add({ days: 1 })) {
				days.push({
					date: date.toDate(getLocalTimeZone()).toISOString(),
					name: 'day ' + i,
					items: []
				});

				i++;
			}

			const promises = days.map((day) =>
				event.locals.pb.collection('tripDays').create({
					...day,
					trip: tripId
				})
			);

			await Promise.all(promises);
		} catch (error) {
			return message(form, 'An unexpected error occurred during the trip creation', {
				status: 500
			});
		}
		return redirect(303, `/trip/${tripId}`);
	}
};
