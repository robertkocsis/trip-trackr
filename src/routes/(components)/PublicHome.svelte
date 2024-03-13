<script lang="ts">
	import Button from '$components/ui/button/button.svelte';

	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
</script>

<div class="min-w-screen flex min-h-screen flex-col" in:fade>
	<div class="mx-36 mt-8 flex flex-1 flex-col items-center">
		<h1 class="mb-4 text-9xl font-bold text-foreground">Trip Trackr</h1>
		<p class="mb-4 text-xl text-foreground">Your Ultimate Travel Companion</p>

		<p class="mt-16 max-w-[800px] text-lg text-foreground">
			Embark on your next adventure with confidence, powered by Trip Trackr. Whether you're
			exploring bustling cities, serene countryside, or exotic locales, our intuitive trip tracker
			is here to streamline your journey from start to finish.
		</p>
		<div class="mb-4 mt-8">
			<Button on:click={() => goto('/signup')} size="lg">Sign Up Now</Button>
		</div>
	</div>
</div>
