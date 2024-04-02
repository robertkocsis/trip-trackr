<script lang="ts">
	import CalendarView from '$components/custom/calendar-view/CalendarView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<CalendarView trip={data.trip}></CalendarView>
