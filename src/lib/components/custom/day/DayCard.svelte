<script lang="ts">
	import * as Card from '$components/ui/card';
	import type { Day } from '$entities/Day';

	export let day: Day;
	export let activityLimit: number | undefined = undefined;
	export let expanded: boolean = false;

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
	<div class="flex flex-col space-y-3 w-96 m-w-96">
		<h1 class="text-2xl">{day.name}</h1>
		{#each day.activities as activity, index}
			{#if activityLimit === undefined || index < activityLimit}
				<Card.Root class="w-96 m-w-96">
					<Card.Header class="pb-3">
						<Card.Title class="flex">
							{activity.name}
							{#if activity.cost}
								<p class="text-xs text-muted-foreground ml-1">
									{activity.cost.amount}{activity.cost.currency}
								</p>
							{/if}
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="grid space-y-1">
							<p class="text-xs text-muted-foreground line-clamp-3">{activity.description}</p>
						</div>
					</Card.Content>
				</Card.Root>
			{/if}
		{/each}
	</div>
{:else}
	<Card.Root class="w-72 m-w-72">
		<Card.Header class="pb-3">
			<Card.Title class="flex">
				{day.name}
				<p class="text-xs text-muted-foreground ml-1">
					{calculateDayCost()}$
				</p>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="grid space-y-1">
				<p class="text-xs text-muted-foreground line-clamp-3">
					activities: {day.activities.length}
				</p>
			</div>
		</Card.Content>
	</Card.Root>
{/if}
