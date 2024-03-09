<script lang="ts">
	import Button from '$components/ui/button/button.svelte';
	
	import { goto } from '$app/navigation';
</script>

<div class="min-w-screen min-h-screen flex flex-col">
	<div class="flex w-100 justify-end my-4 mx-8">
		<a class="text-foreground" href="/login">Login</a>
	</div>
	<div class="flex flex-col flex-1 mt-8 items-center mx-36 h-100">
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
