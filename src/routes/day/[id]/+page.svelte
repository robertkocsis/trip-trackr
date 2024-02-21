<script lang="ts">
	import DayCard from './../../../lib/components/custom/day/DayCard.svelte';
	import { createTrip } from '../../mockdata';

	let trip = createTrip();
</script>

<DayCard day={trip.days[0]} expanded={true} />
