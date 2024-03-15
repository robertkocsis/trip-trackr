<script lang="ts">
	import Button from '$components/ui/button/button.svelte';
	import { currentUser } from '$lib/stores/currentUser.store';
</script>

<div class="flex space-x-4 border-b px-8 py-2">
	{#if $currentUser}
		<div class="flex items-center">
			<a class="text-3xl font-bold" href="/">trip trackr</a>
		</div>
		<Button href="/" variant="link">My trips</Button>
		<div class="flex flex-1 justify-end">
			<Button variant="link" href="/logout" data-sveltekit-preload-data="tap">
				Logout ({$currentUser.email})
			</Button>
		</div>
	{:else}
		<a class="text-foreground" href="/login">Log in</a>
	{/if}
</div>
