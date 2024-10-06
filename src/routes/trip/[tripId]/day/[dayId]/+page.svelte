<script lang="ts">
	import DialogWrapper from '$components/custom/dialog-wrapper/DialogWrapper.svelte';
	import TripHeader from '$components/custom/trip-header/TripHeader.svelte';
	import Button from '$components/ui/button/button.svelte';
	import type { TripDayItem } from '$lib/entities/TripDayItem';
	import { superValidate } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import TripDayItemForm from './(components)/form/DayItemForm.svelte';
	import { dayItemFormSchema } from './(components)/form/schema';
	import Sidebar from './(components)/sidebar/Sidebar.svelte';
	import Timeline from './(components)/timeline/Timeline.svelte';
	export let data: PageData;

	$: dayCost = data.day.items.reduce((acc: number, item: TripDayItem) => acc + (item.cost ?? 0), 0);
</script>

<div class="flex items-center gap-4 bg-white">
	<TripHeader trip={data.trip} />
	<div>
		<h2 class="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
			-
		</h2>
	</div>
	<div>
		<div class="flex items-end space-x-1" style="height: 48px;">
			<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				{data.day.name}
			</h2>
			<span class="self-center text-sm text-muted-foreground">{dayCost}$</span>
		</div>
		<p class="text-sm text-muted-foreground">
			{new Date(data.day.date).toDateString()}
		</p>
	</div>

	<div class="flex items-center space-y-2">
		<DialogWrapper>
			<svelte:fragment slot="trigger">
				<Button variant="default">Add a new item</Button>
			</svelte:fragment>
			<svelte:fragment slot="content">
				{#await superValidate(zod(dayItemFormSchema)) then form}
					<TripDayItemForm superValidatedData={form} />
				{/await}
			</svelte:fragment>
		</DialogWrapper>
	</div>
</div>

<div class="flex gap-10 pt-8">
	<Timeline day={data.day} />
	<Sidebar day={data.day} />
</div>
