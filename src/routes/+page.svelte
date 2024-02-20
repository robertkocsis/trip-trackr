<script lang="ts">
	import * as Card from '$components/ui/card';
	import type { Activity } from '$lib/entities/Activity';
	let activites: Activity[] = [
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
</script>

{#each activites as activity}
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
				<p class="text-xs text-muted-foreground">start: 17:00 - finish: 20:00</p>
				<p class="text-xs text-muted-foreground line-clamp-3">{activity.description}</p>
			</div>
		</Card.Content>
	</Card.Root>
{/each}
