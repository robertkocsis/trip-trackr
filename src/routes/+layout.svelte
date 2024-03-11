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
	<slot />
</div>
