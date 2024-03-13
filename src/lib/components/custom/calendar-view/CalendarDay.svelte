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
					<p class="ml-1 text-xs text-muted-foreground">3$</p>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid space-y-1">
					<p class="line-clamp-3 text-xs text-muted-foreground">
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
	<Card.Root class="rounded-none border-none opacity-30">
		<Card.Header>
			<Card.Title class="select-none opacity-0">lorem</Card.Title>
		</Card.Header>
		<Card.Content class="select-none opacity-0">ipsum</Card.Content>
		<Card.Footer>
			{#if date.getDate() === 1}
				<p class="text-muted-foreground">{months[date.getMonth()]} 1st</p>
			{:else}
				<p class="text-muted-foreground">{date.getDate()}</p>
			{/if}
		</Card.Footer>
	</Card.Root>
{/if}
