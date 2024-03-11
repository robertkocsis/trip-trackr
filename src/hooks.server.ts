import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	const updateCookieAndReturn = async () => {
		const response = await resolve(event);
		const cookie = event.locals.pb.authStore.exportToCookie({ sameSite: 'lax' });
		response.headers.append('set-cookie', cookie);
		return response;
	};

	event.locals.id = '';
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');

	const isAuth: boolean = event.url.pathname === '/login' || event.url.pathname === '/signup';
	if (isAuth) {
		event.locals.pb.authStore.clear();
		return await updateCookieAndReturn();
	}

	const isLogOut: boolean = event.url.pathname === '/logout';
	if (isLogOut) {
		console.log('logout');
		event.locals.pb.authStore.clear();
		return await updateCookieAndReturn();
	}

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');

	if (!event.locals.pb.authStore.isValid) {
		if (event.url.pathname !== '/') {
			throw redirect(303, '/');
		}

		return await updateCookieAndReturn();
	}

	try {
		const auth = await event.locals.pb.collection('users').authRefresh();
		event.locals.id = auth.record.id;
	} catch {
		throw redirect(303, '/');
	}

	return await updateCookieAndReturn();
};
