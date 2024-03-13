<script>
	import { page } from '$app/stores';
	import Header from '$components/custom/header/Header.svelte';

	import { currentUser } from '$lib/stores/currentUser.store';
	import '../app.css';

	export let data;

	$: {
		currentUser.set(data.user);
	}
</script>

<div class="min-w-screen min-h-screen">
	{#if !['/login', '/signup'].includes($page.url.pathname)}
		<Header></Header>
	{/if}

	{#if $currentUser}
		<div class="min-w-screen min-h-screen px-16 py-8">
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
</div>
