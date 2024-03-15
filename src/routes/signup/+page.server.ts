import { fail, redirect, type Actions } from '@sveltejs/kit';
import PocketBase, { ClientResponseError } from 'pocketbase';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signupFormSchema } from './(util)/signup.schema';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signupFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password, confirm } = form.data;

		try {
			const pb = new PocketBase('http://127.0.0.1:8090');

			await pb.collection('users').create({ email, password, passwordConfirm: confirm });
			await event.locals.pb.collection('users').authWithPassword(email, password);
		} catch (error) {
			if (error instanceof ClientResponseError) {
				if (error.response.data.email) {
					return setError(form, 'email', error.response.data.email.message, { status: 400 });
				}

				if (error.response.data.password) {
					return setError(form, 'password', error.response.data.password.message, { status: 400 });
				}
			}

			return message(form, 'An unexpected error happened.', { status: 400 });
		}

		throw redirect(303, '/');
	}
};
