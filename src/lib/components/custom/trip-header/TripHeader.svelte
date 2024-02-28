<script lang="ts">
	import type { TripDay } from '$lib/entities/Day';
	import type { Trip } from '$lib/entities/Trip';
	import { currentTrip } from '$lib/stores/currentTrip.store';

	const calculateTripCost = (trip: Trip) => {
		let cost = 0;
		trip.days.forEach((day: TripDay) => {
			day.activities.forEach((activity) => {
				if (activity.cost) {
					cost += activity.cost.amount;
				}
			});
		});
		return cost;
	};
</script>

<div>
	<div class="flex space-x-1">
		<a class="text-3xl font-bold block" href={`/trip/${$currentTrip.id}`}>{$currentTrip.name}</a>
		<span class="text-sm text-muted-foreground">{calculateTripCost($currentTrip)}$</span>
	</div>

	<p class="text-sm text-muted-foreground">
		{new Date($currentTrip.startDate).toDateString()} - {new Date(
			$currentTrip.endDate
		).toDateString()}
	</p>
</div>
