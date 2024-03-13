<script lang="ts">
	import { currentUser } from '$lib/stores/currentUser.store';
</script>

<div class="flex justify-end border-b px-8 py-4">
	{#if $currentUser}
		<a class="text-foreground" href="/logout" data-sveltekit-preload-data="tap">
			Logout ({$currentUser.email})
		</a>
	{:else}
		<a class="text-foreground" href="/login">Log in</a>
	{/if}
</div>
