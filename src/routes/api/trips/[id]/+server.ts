import type { Trip } from '$lib/entities/Trip';
import type { TripDay } from '$lib/entities/TripDay';
import { ClientResponseError } from 'pocketbase';

export async function DELETE({ locals, params }) {
	if (!locals.id) {
		return new Response(null, { status: 403 });
	}

	try {
		const trip = await locals.pb.collection('trips').getOne(params.id);
		if (trip.user !== locals.id) {
			return new Response(null, { status: 403 });
		}

		await locals.pb.collection('trips').delete(params.id);
	} catch (error) {
		console.error(error);
		return handleClientResponseError(error);
	}

	return new Response(null, { status: 200 });
}

export async function GET({ locals, params }) {
	try {
		const trip = await locals.pb.collection<Trip>('trips').getOne(params.id);

		const days = await locals.pb
			.collection<TripDay>('tripDays')
			.getFullList({ filter: `trip = '${params.id}'` });

		const daysWithItems = await Promise.all(
			days.map(async (day) => {
				const items = await locals.pb
					.collection('dayItems')
					.getFullList({ filter: `tripDay = '${day.id}'` });

				return { ...day, items: items.map((item) => ({ id: item.id, name: item.name })) };
			})
		);

		const response: Trip = buildResponse(trip, daysWithItems);

		return new Response(JSON.stringify(response), { status: 200 });
	} catch (error) {
		console.error(error);
		return handleClientResponseError(error);
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

function handleClientResponseError(error: unknown) {
	if (error instanceof ClientResponseError) {
		if (error.response.code === 403) {
			return new Response(null, { status: 403 });
		}

		if (error.response.code === 404) {
			return new Response(null, { status: 404 });
		}
	}

	return new Response(null, { status: 500 });
}
