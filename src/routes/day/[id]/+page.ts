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
		const activity = {
			name: day.activities[0]?.name ?? '',
			cost: day.activities[0]?.cost?.amount ?? 0,
			description: day.activities[0]?.description ?? ''
		};
		return {
			form: await superValidate(activity, zod(activityFormSchema)),
			day
		};
	}
}
