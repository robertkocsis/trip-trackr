import { redirect } from '@sveltejs/kit';
import { type RecordModel } from 'pocketbase';

export async function load({ params, locals }) {
	try {
		const trip = await locals.pb.collection('trips').getOne(params.id);

		return {
			trip
		} as { trip: RecordModel };
	} catch (error) {
		console.error(error);

		return redirect(303, '/');
	}
}
