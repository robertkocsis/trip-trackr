import { redirect } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';

export const load = async ({ locals }) => {
	if (locals.id) {
		try {
			const trips = await locals.pb
				.collection('trips')
				.getList(1, 5, { filter: `user = '${locals.id}'` });

			return {
				trips: trips.items
			} as { trips: RecordModel[] };
		} catch (error) {
			console.error(error);
			return redirect(303, '/');
		}
	}

	return;
};
