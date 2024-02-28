<script lang="ts">
	import CalendarDay from '$components/custom/calendar-view/CalendarDay.svelte';
	import { getDaysForCalendar } from '$components/custom/calendar-view/getDaysForCalendar';
	import type { TripDay } from '$lib/entities/Day';
	import type { Trip } from '$lib/entities/Trip';
	import { currentTrip } from '$lib/stores/currentTrip.store';
	import { derived } from 'svelte/store';

	let days = derived(currentTrip, ($currentTrip) => {
		return getDaysForCalendar(new Date($currentTrip.startDate), new Date($currentTrip.endDate));
	});

	let weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const datesEqual = (date1: Date, date2: Date) => {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	};

	const getTripDay = (trip: Trip, date: Date): TripDay | undefined => {
		const result = $currentTrip.days.find((tripDay) => datesEqual(new Date(tripDay.date), date));
		if (result) {
			result.name = `Day ${$currentTrip.days.indexOf(result) + 1}`;
		}
		return result;
	};
</script>

<div class="grid grid-flow-row grid-cols-7 gap-4">
	{#each weekdays as weekday}
		<div class="text-sm text-muted-foreground text-center">{weekday}</div>
	{/each}
	{#each $days.daysBefore as date}
		<CalendarDay {date}></CalendarDay>
	{/each}
	{#each $days.tripDays as date}
		<CalendarDay {date} day={getTripDay($currentTrip, date)}></CalendarDay>
	{/each}
	{#each $days.daysAfter as date}
		<CalendarDay {date}></CalendarDay>
	{/each}
</div>
