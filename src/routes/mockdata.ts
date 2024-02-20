import type { Activity } from '$lib/entities/Activity';
import type { Day } from '$lib/entities/Day';
import type { Trip } from '$lib/entities/Trip';

const day: Day = {
	id: '1',
	name: 'Day 1',
	date: new Date().toISOString(),
	activities: [
		{
			id: '1',
			name: 'activity 1',
			description: 'activity description which can be quite long so thats why we truncate it',
			cost: {
				amount: 5,
				currency: 'USD'
			}
		},
		{
			id: '1',
			name: 'activity 1',
			description: 'activity description which can be quite long so thats why we truncate it',
			cost: {
				amount: 5,
				currency: 'USD'
			}
		},
		{
			id: '1',
			name: 'activity 1',
			description: 'activity description which can be quite long so thats why we truncate it',
			cost: {
				amount: 5,
				currency: 'USD'
			}
		}
	]
};

export const createTrip = (): Trip => {
	return {
		id: Math.random.toString(),
		name: `Trip ${getRandomNumber(1, 100)}`,
		startDate: new Date().toISOString(),
		endDate: new Date().toISOString(),
		days: Array.from({ length: getRandomNumber(1, 10) }, createDay)
	};
};

const createDay = (): Day => {
	return {
		id: Math.random.toString(),
		name: `Day ${getRandomNumber(1, 100)}`,
		date: new Date().toISOString(),
		activities: Array.from({ length: getRandomNumber(1, 10) }, createActivity)
	};
};

const createActivity = (): Activity => {
	return {
		id: Math.random.toString(),
		name: `Activity ${getRandomNumber(1, 100)}`,
		description: `Activity description ${getRandomNumber(1, 100)}`,
		cost: {
			amount: getRandomNumber(1, 100),
			currency: 'USD'
		}
	};
};

const getRandomNumber = (min: number, max: number) => {
	return Math.round(Math.random() * (max - min) + min);
};
