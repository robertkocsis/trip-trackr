import { currentTrip } from '$lib/stores/currentTrip.store';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export function load({ params }) {
	const trip = get(currentTrip);

	const day = trip.days.find((day) => day.id === params.id);

	if (!day) {
		redirect(302, `/trip/${trip.id}`);
	} else {
		return {
			day
		};
	}
}
