<script lang="ts">
	import { currentUser } from '$lib/stores/currentUser.store';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import AuthHome from './(components)/AuthHome.svelte';
	import PublicHome from './(components)/PublicHome.svelte';

	let loaded = false;

	export let data: PageData;

	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 100);
	});
</script>

{#if $currentUser && loaded}
	<AuthHome {data}></AuthHome>
{:else if loaded}
	<PublicHome></PublicHome>
{/if}
