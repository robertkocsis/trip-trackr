<script lang="ts">
	import * as Card from '$components/ui/card';
	import type { Activity } from '$lib/entities/Activity';
	import type { Day } from '$lib/entities/Day';
	let activites: Activity[] = [
		{
			id: '1',
			name: 'activity 1',
			description: 'activity description which can be quite long so thats why we truncate it',
			cost: {
				amount: 5,
				currency: 'USD'
			}
		},
		{
			id: '1',
			name: 'activity 1',
			description: 'activity description which can be quite long so thats why we truncate it',
			cost: {
				amount: 5,
				currency: 'USD'
			}
		},
		{
			id: '1',
			name: 'activity 1',
			description: 'activity description which can be quite long so thats why we truncate it',
			cost: {
				amount: 5,
				currency: 'USD'
			}
		}
	];

	let day: Day = {
		id: '1',
		name: 'Day 1',
		date: new Date().toISOString(),
		activities: activites
	};
</script>

<div class="grid space-y-3">
	<h1 class="text-2xl">{day.name}</h1>
	{#each day.activities as activity}
		<Card.Root class="w-72">
			<Card.Header class="pb-3">
				<Card.Title class="flex"
					>{activity.name}
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
	{/each}
</div>
