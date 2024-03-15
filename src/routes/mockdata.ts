import { getDatesBetween } from '$components/custom/calendar-view/getDaysForCalendar';
import type { Activity } from '$lib/entities/DayItem';
import type { Trip } from '$lib/entities/Trip';
import type { TripDay } from '$lib/entities/TripDay';
import { v4 } from 'uuid';

export const createTrip = (): Trip => {
	const startDate = new Date();
	const endDate = new Date(new Date().setDate(new Date().getDate() + 10));
	return {
		id: v4(),
		name: `Trip ${getRandomNumber(1, 100)}`,
		startDate: startDate.toISOString(),
		endDate: endDate.toISOString(),
		days: createDays(startDate, endDate)
	};
};

export const createDays = (from: Date, to: Date): Day[] => {
	return getDatesBetween(from, to).map(createDay);
};

const createDay = (date: Date): TripDay => {
	return {
		id: v4(),
		name: `Day ${getRandomNumber(1, 100)}`,
		date: date.toISOString(),
		activities: Array.from({ length: getRandomNumber(1, 10) }, createActivity)
	};
};

const createActivity = (): Activity => {
	return {
		id: v4(),
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
