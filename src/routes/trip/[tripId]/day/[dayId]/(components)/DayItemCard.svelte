<script lang="ts">
	import type { DayItem } from '$lib/entities/DayItem';
	import { Pencil } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	let dispatcher = createEventDispatcher();

	export let dayItem: DayItem;
</script>

<div class="flex flex-col space-y-10">
	<div class="flex space-x-2">
		<h2 class="text-3xl font-bold">{dayItem.name}</h2>
		<button type="button" class="cursor-pointer" on:click={() => dispatcher('editClicked')}>
			<Pencil />
		</button>
	</div>
	<div>
		<p class="text-md font-bold">Cost:</p>
		<p class="text-sm">{dayItem.cost ?? 0} $</p>
	</div>
	{#if dayItem.description}
		<div>
			<p class="text-md font-bold">Description:</p>
			<p class="text-sm">{dayItem.description}</p>
		</div>
	{/if}
</div>
