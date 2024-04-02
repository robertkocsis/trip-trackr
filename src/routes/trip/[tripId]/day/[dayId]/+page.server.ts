import { activityFormSchema } from '$components/custom/activity/form/schema';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(activityFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};

export async function load({ params, parent }) {
	const { trip } = await parent();

	const day = trip.days.find((day) => day.id === params.dayId);

	console.log('day', day);
	console.log('trip', trip);
	console.log('params', params);

	if (!day) {
		redirect(302, `/trip/${trip.id}`);
	} else {
		return {
			form: await superValidate({}, zod(activityFormSchema)),
			day
		};
	}
}
