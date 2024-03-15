import type { Trip } from '$lib/entities/Trip.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
	try {
		const trip = await locals.pb.collection<Trip>('trips').getOne(params.id);

		return {
			trip: {
				id: trip.id,
				start: trip.start,
				end: trip.end,
				name: trip.name,
				user: trip.user,
				days: []
			}
		} as { trip: Trip };
	} catch (error) {
		console.error(error);

		return redirect(303, '/');
	}
}
