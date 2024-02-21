import { getDatesBetween } from '$components/custom/calendar-view/getDaysForCalendar';
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
	const startDate = new Date();
	const endDate = new Date(new Date().setDate(new Date().getDate() + 10));
	return {
		id: Math.random.toString(),
		name: `Trip ${getRandomNumber(1, 100)}`,
		startDate: startDate.toISOString(),
		endDate: endDate.toISOString(),
		days: createDays(startDate, endDate)
	};
};

export const createDays = (from: Date, to: Date): Day[] => {
	return getDatesBetween(from, to).map(createDay);
};

const createDay = (date: Date): Day => {
	return {
		id: Math.random.toString(),
		name: `Day ${getRandomNumber(1, 100)}`,
		date: date.toISOString(),
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
