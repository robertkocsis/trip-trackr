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
		} catch (error) {
			return message(form, 'An unexpected error occurred during the trip creation', {
				status: 500
			});
		}
		return redirect(303, `/trip/${tripId}`);
	}
};
