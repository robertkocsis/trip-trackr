import type { TripDay } from '$lib/entities/TripDay';
import { ClientResponseError } from 'pocketbase';

export async function POST({ locals, params }) {
	if (!locals.id) {
		return new Response(null, { status: 403 });
	}

	try {
		const day = (await locals.pb.collection('tripDays').getOne(params.dayId)) as TripDay;

		const dayItem = await locals.pb
			.collection('dayItems')
			.create({ name: 'New Item', tripDay: day.id });

		return new Response(JSON.stringify({ id: dayItem.id, name: dayItem.name, description: '' }), {
			status: 200
		});
	} catch (error) {
		console.error(error);
		return handleClientResponseError(error);
	}
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
