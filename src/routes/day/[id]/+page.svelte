<script lang="ts">
	import { currentTrip } from '$lib/stores/currentTrip.store';
	import DayCard from '$components/custom/day/DayCard.svelte';
</script>

<DayCard day={$currentTrip.days[0]} expanded={true} />
