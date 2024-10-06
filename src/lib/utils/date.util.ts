import { DateFormatter } from '@internationalized/date';

export function timeStringToDate(timeString: string): Date {
	const [hours, minutes] = timeString.split(':').map(Number);
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	return date;
}

export function dateToTimeString(date: Date): string {
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${hours}:${minutes}`;
}

export function isoToTimeString(isoString: string): string {
	const date = new Date(isoString);
	return dateToTimeString(date);
}

export function timeStringToIso(timeString: string): string {
	const date = timeStringToDate(timeString);
	return date.toISOString();
}

const df = new DateFormatter('en-US', {
	dateStyle: 'medium'
});

export function formatDate(date: Date): string {
	return df.format(date);
}
