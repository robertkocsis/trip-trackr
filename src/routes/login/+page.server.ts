import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema } from './(util)/login.schema';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		try {
			await event.locals.pb.collection('users').authWithPassword(email, password);
		} catch (error) {
			if (error instanceof ClientResponseError && error.response.code === 400) {
				return message(form, 'Email or password is incorrect', { status: 400 });
			}

			return message(form, 'An unexpected error happened', { status: 400 });
		}

		throw redirect(303, '/');
	}
};
