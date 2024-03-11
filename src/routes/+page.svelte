<script lang="ts">
	import Button from '$components/ui/button/button.svelte';
	import { currentUser } from '$lib/stores/currentUser.store';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let loaded = false;

	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 100);
	});
</script>

{#if $currentUser && loaded}
	<div>placeholder</div>
{:else if loaded}
	<div class="min-w-screen min-h-screen flex flex-col" in:fade>
		<div class="flex flex-col flex-1 mt-8 items-center mx-36">
			<h1 class="text-9xl font-bold mb-4 text-foreground">Trip Trackr</h1>
			<p class="text-xl mb-4 text-foreground">Your Ultimate Travel Companion</p>

			<p class="text-lg text-foreground mt-16 max-w-[800px]">
				Embark on your next adventure with confidence, powered by Trip Trackr. Whether you're
				exploring bustling cities, serene countryside, or exotic locales, our intuitive trip tracker
				is here to streamline your journey from start to finish.
			</p>
			<div class="mt-8 mb-4">
				<Button on:click={() => goto('/signup')} size="lg">Sign Up Now</Button>
			</div>
		</div>
	</div>
{/if}
