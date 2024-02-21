import type { Trip } from '$lib/entities/Trip';
import { writable } from 'svelte/store';
import { createTrip } from '../../routes/mockdata';

export const currentTrip = writable<Trip>(createTrip());