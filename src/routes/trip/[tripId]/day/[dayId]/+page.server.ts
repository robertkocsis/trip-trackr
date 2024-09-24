import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { activityFormSchema } from './(components)/form/schema';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(activityFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { params } = event;

		await event.fetch(`/api/day/${params.dayId}/items/${form.data.id}`, {
			method: 'POST',
			body: JSON.stringify(form.data)
		});

		return {
			form
		};
	}
};

export async function load({ params, parent }) {
	const { trip } = await parent();

	const day = trip.days.find((day) => day.id === params.dayId);

	if (!day) {
		redirect(302, `/trip/${trip.id}`);
	} else {
		return {
			form: await superValidate({}, zod(activityFormSchema)),
			day
		};
	}
}
