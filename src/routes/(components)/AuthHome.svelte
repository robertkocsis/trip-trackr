<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$components/ui/button/button.svelte';
	import * as Card from '$components/ui/card';
	import { currentUser } from '$lib/stores/currentUser.store';
	import { DateFormatter } from '@internationalized/date';
	import type { PageData } from '../$types';

	export let data: PageData;

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	const deleteTrip = async (id: string) => {
		await fetch(`api/trips/${id}`, {
			method: 'DELETE'
		});

		invalidateAll();
	};
</script>

{#if $currentUser}
	{#if data?.trips && data.trips.length > 0}
		<div class="mb-4 flex items-center">
			<div>
				<h1 class="text-3xl font-bold">Your existing trips</h1>
			</div>
			<div class="flex flex-1 items-center justify-end">
				<p class="text-md text-muted-foreground">Are you ready for a new adventure?</p>
				<Button href="trip/create" variant="link">Create a trip now!</Button>
			</div>
		</div>

		{#each data.trips as trip}
			<Card.Root class="w-[300px]">
				<Card.Header>
					<Card.Title>{trip.name}</Card.Title>
					<Card.Description>
						{df.format(new Date(trip.start))} - {df.format(new Date(trip.end))}
					</Card.Description>
				</Card.Header>
				<Card.Content>You have 0 items for this trip</Card.Content>
				<Card.Footer class="flex justify-between">
					<Button
						variant="ghost"
						class="hover:bg-destructive/40 hover:text-destructive-foreground"
						size="sm"
						on:click={() => deleteTrip(trip.id)}>
						Delete Trip
					</Button>
					<Button variant="ghost" size="sm" href="trip/{trip.id}">View Trip</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	{:else}
		<div class="min-w-screen flex min-h-screen flex-col">
			<h1 class="text-3xl font-bold">Welcome back!</h1>

			<div class="flex flex-1 flex-col items-center">
				<div class="mt-36 flex flex-col items-center space-y-4">
					<p class="text-center text-lg text-muted-foreground">
						It seems like you don't have any trips planned yet. Why not start by creating a new
						trip?
					</p>
					<Button on:click={() => goto('/trip/create')}>Create Trip</Button>
				</div>
			</div>
		</div>
	{/if}
{/if}
