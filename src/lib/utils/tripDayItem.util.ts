import type { TripDayItem } from '$lib/entities/TripDayItem';
import { isoToTimeString } from '$lib/utils/date.util';
import type { Infer } from 'sveltekit-superforms';
import type { TripDayItemFormSchema } from '../../routes/trip/[tripId]/day/[dayId]/(components)/form/schema';

const formatTripDayItemTime = (item: TripDayItem): Infer<TripDayItemFormSchema> => {
	const result: Infer<TripDayItemFormSchema> = { ...item };

	if (item.start) {
		const [hours, minutes] = isoToTimeString(item.start).split(':').map(Number);
		result.startHours = hours.toString().padStart(2, '0');
		result.startMinutes = minutes.toString().padStart(2, '0');
	}

	if (item.end) {
		const [hours, minutes] = isoToTimeString(item.end).split(':').map(Number);
		result.endHours = hours.toString().padStart(2, '0');
		result.endMinutes = minutes.toString().padStart(2, '0');
	}

	return result;
};

export { formatTripDayItemTime };
