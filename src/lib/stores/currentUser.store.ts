import type { User } from '$lib/entities/User';
import { writable } from 'svelte/store';

export const currentUser = writable<User | undefined>();
