export const getDaysForCalendar = (
	startDate: Date,
	endDate: Date
): { daysBefore: Date[]; tripDays: Date[]; daysAfter: Date[] } => {
	const daysBefore = getDatesUntilLastMonday(startDate);
	const tripDays = getDatesBetween(startDate, endDate);
	const daysAfter = getDatesUntilNextSunday(endDate);

	daysAfter.sort((a, b) => a.getTime() - b.getTime());
	tripDays.sort((a, b) => a.getTime() - b.getTime());
	daysBefore.sort((a, b) => a.getTime() - b.getTime());

	return {
		daysBefore,
		tripDays,
		daysAfter
	};
};

export const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
	const dates = [];
	let currentDate = startDate;
	while (currentDate <= endDate) {
		dates.push(new Date(currentDate));
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() + 1);
		currentDate = newDate;
	}

	return dates;
};

const getDatesUntilNextSunday = (date: Date): Date[] => {
	let foundSunday = false;
	const dates = [];
	let currentDate = date;
	while (!foundSunday) {
		const nextDate = new Date(currentDate);
		nextDate.setDate(nextDate.getDate() + 1);
		dates.push(new Date(nextDate));

		const isSunday = new Date(nextDate).getDay() === 0;
		if (isSunday && dates.length > 2) {
			foundSunday = true;
		}

		currentDate = nextDate;
	}

	return dates;
};

const getDatesUntilLastMonday = (date: Date): Date[] => {
	let foundSunday = false;
	const dates = [];
	let currentDate = date;
	while (!foundSunday) {
		const nextDate = new Date(currentDate);
		nextDate.setDate(nextDate.getDate() - 1);
		dates.push(new Date(nextDate));

		const isMonday = new Date(nextDate).getDay() === 1;
		if (isMonday && dates.length > 2) {
			foundSunday = true;
		}

		currentDate = nextDate;
	}

	return dates;
};
