<script lang="ts">
	import { currentUser } from '$lib/stores/currentUser.store';

	import { onMount } from 'svelte';
	import AuthHome from './(components)/AuthHome.svelte';
	import PublicHome from './(components)/PublicHome.svelte';

	let loaded = false;

	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 100);
	});
</script>

{#if $currentUser && loaded}
	<AuthHome></AuthHome>
{:else if loaded}
	<PublicHome></PublicHome>
{/if}
