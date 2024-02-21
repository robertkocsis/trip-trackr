<script lang="ts">
	import CalendarView from '$components/custom/calendar-view/CalendarView.svelte';
	import type { Trip } from '$lib/entities/Trip';
	import { currentTrip } from '$lib/stores/currentTrip.store';

	const calculateTripCost = (trip: Trip) => {
		let cost = 0;
		trip.days.forEach((day) => {
			day.activities.forEach((activity) => {
				if (activity.cost) {
					cost += activity.cost.amount;
				}
			});
		});
		return cost;
	};
</script>

<div class="mb-6">
	<div class="flex space-x-1">
		<h2 class="text-3xl font-bold">{$currentTrip.name}</h2>
		<span class="text-sm text-muted-foreground">{calculateTripCost($currentTrip)}$</span>
	</div>

	<p class="text-sm text-muted-foreground">
		{new Date($currentTrip.startDate).toDateString()} - {new Date(
			$currentTrip.endDate
		).toDateString()}
	</p>
</div>

<CalendarView></CalendarView>
