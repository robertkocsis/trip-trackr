<script lang="ts">
	import * as Card from '$components/ui/card';
	import type { TripDay } from '$lib/entities/TripDay';
	import { createEventDispatcher } from 'svelte';

	export let day: TripDay;
	export let activityLimit: number | undefined = undefined;
	export let expanded: boolean = false;

	const dispatch = createEventDispatcher();

	const calculateDayCost = () => {
		let cost = 0;
		day.activities.forEach((activity) => {
			if (activity.cost) {
				cost += activity.cost.amount;
			}
		});
		return cost;
	};
</script>

{#if expanded}
	<div class="m-w-96 flex w-96 flex-col space-y-3">
		<div>
			<div class="flex space-x-1">
				<h2 class="text-2xl font-bold">{day.name}</h2>
				<span class="text-sm text-muted-foreground">{calculateDayCost()}$</span>
			</div>
			<p class="text-sm text-muted-foreground">
				{new Date(day.date).toDateString()}
			</p>
		</div>

		{#each day.activities as activity, index}
			{#if activityLimit === undefined || index < activityLimit}
				<Card.Root
					class="m-w-96 w-96 cursor-pointer"
					on:click={() => dispatch('activitySelected', { activity })}>
					<Card.Header class="pb-3">
						<Card.Title class="flex">
							{activity.name}
							{#if activity.cost}
								<p class="ml-1 text-xs text-muted-foreground">
									{activity.cost.amount}{activity.cost.currency}
								</p>
							{/if}
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="grid space-y-1">
							<p class="line-clamp-3 text-xs text-muted-foreground">{activity.description}</p>
						</div>
					</Card.Content>
				</Card.Root>
			{/if}
		{/each}
	</div>
{:else}
	<Card.Root class="m-w-72 w-72">
		<Card.Header class="pb-3">
			<Card.Title class="flex">
				{day.name}
				<p class="ml-1 text-xs text-muted-foreground">
					{calculateDayCost()}$
				</p>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="grid space-y-1">
				<p class="line-clamp-3 text-xs text-muted-foreground">
					activities: {day.activities.length}
				</p>
			</div>
		</Card.Content>
	</Card.Root>
{/if}
