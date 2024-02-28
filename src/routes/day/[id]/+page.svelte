<script>
	import DayCard from '$components/custom/day/DayCard.svelte';
	import ActivityCard from '$components/custom/activity/ActivityCard.svelte';
	import TripHeader from '$components/custom/trip-header/TripHeader.svelte';
	import { currentTrip } from '$lib/stores/currentTrip.store';
</script>

<div class="grid grid-flow-col grid-cols-2">
	<div class="space-y-6">
		<TripHeader></TripHeader>
		<div class="flex justify-start items-center">
			<DayCard day={$currentTrip.days[0]} expanded={true} />
		</div>
	</div>
	<div>
		<ActivityCard activity={$currentTrip.days[0].activities[0]}></ActivityCard>
	</div>
</div>
