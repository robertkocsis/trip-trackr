<script lang="ts">
	import { currentUser } from '$lib/stores/currentUser.store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		currentUser.set(undefined);
		goto('/');
	});
</script>
