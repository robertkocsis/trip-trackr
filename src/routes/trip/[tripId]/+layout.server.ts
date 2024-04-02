import type { Trip } from '$lib/entities/Trip.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	try {
		const response = await fetch(`/api/trips/${params.tripId}`);

		if (!response.ok) {
			throw new Error('Failed to fetch trip');
		}

		return {
			trip: (await response.json()) as Trip
		} as { trip: Trip };
	} catch (error) {
		console.error(error);

		return redirect(303, '/');
	}
}
