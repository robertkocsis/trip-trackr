import { redirect } from '@sveltejs/kit';
import type { AuthModel } from 'pocketbase';

export const load = async ({ locals }) => {
	if (locals.id) {
		try {
			const user = await locals.pb.authStore.model;
			return {
				user
			} as { user?: AuthModel };
		} catch {
			return redirect(303, '/');
		}
	}

	return;
};
