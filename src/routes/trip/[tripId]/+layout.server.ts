import type { Trip } from '$lib/entities/Trip.js';
import type { TripDay } from '$lib/entities/TripDay';
import type { TripDayItem } from '$lib/entities/TripDayItem.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
	try {
		const trip = await locals.pb.collection<Trip>('trips').getOne(params.tripId);

		const days = await locals.pb
			.collection<TripDay>('tripDays')
			.getFullList({ filter: `trip = '${params.tripId}'` });

		for (const day of days) {
			try {
				const items: TripDayItem[] = await locals.pb
					.collection('dayItems')
					.getFullList({ filter: `tripDay = '${day.id}'` });

				const mappedItems = items.map((item) => ({
					id: item.id,
					name: item.name,
					start: item.start,
					end: item.end,
					cost: item.cost,
					description: item.description
				}));

				day.items = mappedItems ?? [];
			} catch (error) {
				day.items = [];
				console.log('item fetching failed', error);
			}
		}

		const response = buildResponse(trip, days);

		return {
			trip: response as Trip
		} as { trip: Trip };
	} catch (error) {
		console.error('trip fetching failed', error);

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
