<script lang="ts">
	import TripHeader from '$components/custom/trip-header/TripHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.trip}
	<div class="space-y-6">
		<TripHeader trip={data.trip}></TripHeader>
		<slot />
	</div>
{/if}
