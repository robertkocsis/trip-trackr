<script lang="ts">
	import CalendarDay from '$components/custom/calendar-view/CalendarDay.svelte';
	import { getDaysForCalendar } from '$components/custom/calendar-view/getDaysForCalendar';
	import type { Trip } from '$lib/entities/Trip';
	import type { TripDay } from '$lib/entities/TripDay';

	export let trip: Trip;

	$: days = getDaysForCalendar(new Date(trip.start), new Date(trip.end));

	let weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const datesEqual = (date1: Date, date2: Date) => {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	};

	const getTripDay = (trip: Trip, date: Date): TripDay | undefined => {
		const result = trip.days.find((tripDay) => datesEqual(new Date(tripDay.date), date));
		if (result) {
			result.name = `Day ${trip.days.indexOf(result) + 1}`;
		}
		return result;
	};
</script>

<div class="grid grid-flow-row grid-cols-7 gap-4">
	{#each weekdays as weekday}
		<div class="text-center text-sm text-muted-foreground">{weekday}</div>
	{/each}
	{#each days.daysBefore as date}
		<CalendarDay {date}></CalendarDay>
	{/each}
	{#each days.tripDays as date}
		<CalendarDay {date} day={getTripDay(trip, date)} tripId={trip.id}></CalendarDay>
	{/each}
	{#each days.daysAfter as date}
		<CalendarDay {date}></CalendarDay>
	{/each}
</div>
