<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$components/ui/button/button.svelte';
	import { currentUser } from '$lib/stores/currentUser.store';
</script>

{#if $currentUser}
	<div class="min-w-screen flex min-h-screen flex-col px-16 py-8">
		<h1 class="text-3xl font-bold">Welcome back!</h1>

		<div class="flex flex-1 flex-col items-center">
			<div class="mt-36 flex flex-col items-center space-y-4">
				<p class="text-center text-lg text-muted-foreground">
					It seems like you don't have any trips planned yet. Why not start by creating a new trip?
				</p>
				<Button on:click={() => goto('/trip/new')}>Create a new trip</Button>
			</div>
		</div>
	</div>
{/if}
