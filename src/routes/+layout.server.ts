import type { User } from '$lib/entities/User.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.id) {
		try {
			const user = (await locals.pb.authStore.model) as User;
			return {
				user: {
					id: user.id,
					email: user.email
				}
			} as { user?: User };
		} catch {
			return redirect(303, '/');
		}
	}

	return;
};
