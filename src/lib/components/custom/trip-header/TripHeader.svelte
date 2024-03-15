<script lang="ts">
	import type { Trip } from '$lib/entities/Trip';
	import { DateFormatter } from '@internationalized/date';
	import { ArrowLeft } from 'lucide-svelte';

	export let trip: Trip;

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	export let showBackButton = false;
</script>

<div>
	<div class="flex space-x-1">
		<a href={`/trip/${trip.id}`} class="flex items-center space-x-1">
			{#if showBackButton}
				<ArrowLeft />
			{/if}
			<p class="text-3xl font-bold">{trip.name}</p>
		</a>
		<span class="text-sm text-muted-foreground">0$</span>
	</div>

	<p class="text-sm text-muted-foreground">
		{df.format(new Date(trip.start))} - {df.format(new Date(trip.end))}
	</p>
</div>
