import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createTripSchema } from './(util)/createTrip.schema';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createTripSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		event.locals.pb.collection('trips').create(form.data);

		return { form };
	}
};
