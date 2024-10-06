import type { TripDayItem } from '$lib/entities/TripDayItem';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { dayItemFormSchema } from './(components)/form/schema';

export const actions: Actions = {
	persist: async ({ request, params, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(dayItemFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data } = form;

		const item: TripDayItem = {
			id: data.id ?? '',
			name: data.name,
			cost: data.cost,
			description: data.description,
			start: data.start,
			end: data.end
		};

		try {
			if (data.id) {
				await locals.pb.collection('dayItems').update(data.id, item);
			} else {
				await locals.pb.collection('dayItems').create({ ...item, tripDay: params.dayId });
			}

			return {
				form
			};
		} catch (e) {
			console.error(e);
			return error(404, 'An error occurred while saving the item');
		}
	},
	delete: async ({ request, locals }) => {
		const form = await request.formData();

		const id = form.get('id');
		await locals.pb.collection('dayItems').delete(id as string);
		return {
			result: {
				type: 'success'
			}
		};
	}
};

export async function load({ params, parent }) {
	const { trip } = await parent();

	const day = trip.days.find((day) => day.id === params.dayId);

	if (!day) {
		redirect(302, `/trip/${trip.id}`);
	} else {
		return {
			day
		};
	}
}
