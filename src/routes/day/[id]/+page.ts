import { activityFormSchema } from '$components/custom/activity/form/schema.js';
import { currentTrip } from '$lib/stores/currentTrip.store';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
	const trip = get(currentTrip);

	const day = trip.days.find((day) => day.id === params.id);

	if (!day) {
		redirect(302, `/trip/${trip.id}`);
	} else {
		return {
			form: await superValidate(zod(activityFormSchema)),
			day
		};
	}
}