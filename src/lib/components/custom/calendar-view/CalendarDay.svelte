<script lang="ts">
	import * as Card from '$components/ui/card';
	import type { TripDay } from '$lib/entities/Day';
	export let day: TripDay | undefined = undefined;
	export let date: Date;

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
</script>

{#if day}
	<a href={`/day/${day.id}`}>
		<Card.Root class="rounded-none border-none">
			<Card.Header>
				<Card.Title class="flex">
					<p>
						{day.name}
					</p>
					<p class="text-xs text-muted-foreground ml-1">3$</p>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid space-y-1">
					<p class="text-xs text-muted-foreground line-clamp-3">
						activities: {day.activities.length}
					</p>
				</div>
			</Card.Content>
			<Card.Footer>
				{#if date.getDate() === 1}
					<p class="text-muted-foreground">{months[date.getMonth()]} 1st</p>
				{:else}
					<p class="text-muted-foreground">{date.getDate()}</p>
				{/if}
			</Card.Footer>
		</Card.Root>
	</a>
{:else}
	<Card.Root class="rounded-none opacity-30 border-none">
		<Card.Header>
			<Card.Title class="opacity-0 select-none">lorem</Card.Title>
		</Card.Header>
		<Card.Content class="opacity-0 select-none">ipsum</Card.Content>
		<Card.Footer>
			{#if date.getDate() === 1}
				<p class="text-muted-foreground">{months[date.getMonth()]} 1st</p>
			{:else}
				<p class="text-muted-foreground">{date.getDate()}</p>
			{/if}
		</Card.Footer>
	</Card.Root>
{/if}
