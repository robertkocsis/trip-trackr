<script lang="ts">
	import type { Trip } from '$lib/entities/Trip';
	import type { TripDay } from '$lib/entities/TripDay';
	import { DateFormatter } from '@internationalized/date';
	import { ArrowLeft } from 'lucide-svelte';

	export let trip: Trip;

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	export let showBackButton = false;

	$: tripCost = trip?.days.reduce(
		(acc: number, day: TripDay) =>
			acc + (day.items.reduce((acc: number, item: TripDayItem) => acc + (item.cost ?? 0), 0) ?? 0),
		0
	);
</script>

<div>
	<div class="flex space-x-1">
		<a href={`/trip/${trip.id}`} class="flex items-center space-x-1">
			{#if showBackButton}
				<ArrowLeft />
			{/if}

			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{trip.name}
			</h1>
		</a>
		<span class="text-sm text-muted-foreground">${tripCost}$</span>
	</div>

	<p class="text-sm text-muted-foreground">
		{df.format(new Date(trip.start))} - {df.format(new Date(trip.end))}
	</p>
</div>
