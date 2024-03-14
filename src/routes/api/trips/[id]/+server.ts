import { ClientResponseError } from 'pocketbase';

export async function DELETE({ locals, params }) {
	if (!locals.id) {
		return new Response(null, { status: 403 });
	}

	if (!params.id) {
		return new Response(null, { status: 400 });
	}

	try {
		const trip = await locals.pb.collection('trips').getOne(params.id);
		if (trip.user !== locals.id) {
			return new Response(null, { status: 403 });
		}

		await locals.pb.collection('trips').delete(params.id);
	} catch (error) {
		console.error(error);

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

	return new Response(null, { status: 200 });
}
