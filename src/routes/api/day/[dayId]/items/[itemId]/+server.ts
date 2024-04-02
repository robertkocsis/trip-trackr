import type { DayItem } from '$lib/entities/DayItem.js';
import { ClientResponseError } from 'pocketbase';

export async function POST({ locals, params, request }) {
	const body = await request.json();

	if (!locals.id) {
		return new Response(null, { status: 403 });
	}

	console.log('params', params, body, locals);

	try {
		const dayItem = (await locals.pb.collection('dayItems').getOne(params.itemId)) as DayItem;

		await locals.pb.collection('dayItems').update(dayItem.id, { name: body.name });

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
