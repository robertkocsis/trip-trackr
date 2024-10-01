import type { Trip } from '$lib/entities/Trip.js';
import type { TripDay } from '$lib/entities/TripDay';
import { redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
	try {
		const trip = await locals.pb.collection<Trip>('trips').getOne(params.tripId);

		const days = await locals.pb
			.collection<TripDay>('tripDays')
			.getFullList({ filter: `trip = '${params.tripId}'` });

		const daysWithItems: TripDay[] = await Promise.all(
			days.map(async (day) => {
				const items = await locals.pb
					.collection('dayItems')
					.getFullList({ filter: `tripDay = '${day.id}'` });

				return {
					...day,
					items: items.map((item) => ({
						id: item.id,
						name: item.name,
						start: item.start,
						end: item.end,
						cost: item.cost,
						description: item.description
					}))
				};
			})
		);

		const response = buildResponse(trip, daysWithItems);

		return {
			trip: response as Trip
		} as { trip: Trip };
	} catch (error) {
		console.error(error);

		return redirect(303, '/');
	}
}

function buildResponse(trip: Trip, days: TripDay[]): Trip {
	return {
		id: trip.id,
		start: trip.start,
		end: trip.end,
		name: trip.name,
		user: trip.user,
		days: days
	};
}
