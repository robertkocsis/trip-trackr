<script lang="ts">
	import { currentTrip } from '$lib/stores/currentTrip.store';
	import DayCard from '$components/custom/day/DayCard.svelte';
	import type { Trip } from '$lib/entities/Trip';

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

	<p class="text-sm text-muted-foreground">Apr 15, 2022 - May 1, 2022</p>
</div>

<div class="grid gap-x-2 gap-y-10">
	{#each $currentTrip.days as day}
		<a href="/day/{day.id}">
			<DayCard {day} activityLimit={3} />
		</a>
	{/each}
</div>

<style lang="postcss">
	.grid {
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
</style>
