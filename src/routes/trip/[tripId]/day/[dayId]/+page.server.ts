import type { TripDay } from '$lib/entities/TripDay';
import type { TripDayItem } from '$lib/entities/TripDayItem';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
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

		const day = (await locals.pb.collection('tripDays').getOne(params.dayId!)) as TripDay;

		const item: TripDayItem = {
			id: data.id ?? '',
			name: data.name,
			cost: data.cost,
			description: data.description
		};

		if (data.startHours && data.startMinutes) {
			const startDate = new Date(day.date);
			startDate.setHours(Number(data.startHours), Number(data.startMinutes), 0, 0);
			item.start = startDate.toISOString();
		}

		if (data.endHours && data.endMinutes) {
			const endDate = new Date(day.date);
			endDate.setHours(Number(data.endHours), Number(data.endMinutes), 0, 0);
			item.end = endDate.toISOString();
		}

		if (data.id) {
			await locals.pb.collection('dayItems').update(data.id, item);
		} else {
			await locals.pb.collection('dayItems').create({ ...item, tripDay: params.dayId });
		}

		return {
			form
		};
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
