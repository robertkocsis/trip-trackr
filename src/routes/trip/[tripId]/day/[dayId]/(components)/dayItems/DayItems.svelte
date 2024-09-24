<script lang="ts">
	import * as Card from '$components/ui/card';
	import * as Carousel from '$components/ui/carousel';
	import * as Dialog from '$components/ui/dialog';
	import type { TripDay } from '$lib/entities/TripDay';
	import { createEventDispatcher } from 'svelte';

	export let day: TripDay;
	const dispatch = createEventDispatcher();
</script>

{#each day.items as item, index}
	<Dialog.Root>
		<Dialog.Trigger>
			<Card.Root
				class="min-w-[400px] cursor-pointer"
				on:click={() => dispatch('activitySelected', { activity: item })}>
				<Card.Header class="pb-3">
					<Card.Title class="flex">
						{item.name}
						{#if item.cost}
							<p class="ml-1 text-xs text-muted-foreground">
								{item.cost}$
							</p>
						{/if}
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid space-y-1">
						<p class="line-clamp-3 text-xs text-muted-foreground">{item.description}</p>
					</div>
				</Card.Content>
			</Card.Root>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
				<Dialog.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
{/each}
