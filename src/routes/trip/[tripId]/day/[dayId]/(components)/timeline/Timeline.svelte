<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { TripDay } from '$lib/entities/TripDay';
	import type { TripDayItem } from '$lib/entities/TripDayItem';
	import { formatTripDayItemTime } from '$lib/utils/tripDayItem.util';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superValidate } from 'sveltekit-superforms/client';
	import TripDayItemForm from '../form/DayItemForm.svelte';
	import { dayItemFormSchema, type TripDayItemFormSchema } from '../form/schema';

	export let day: TripDay;

	const minuteLengthInPx = 0.86;

	const hours = Array(24);
	let form: SuperValidated<Infer<TripDayItemFormSchema>> | null = null;
	let dialogOpen = false;

	const openDialog = async (item: TripDayItem) => {
		form = await superValidate(formatTripDayItemTime(item), zod(dayItemFormSchema));
		dialogOpen = true;
	};

	$: {
		if (!dialogOpen) {
			form = null;
		}
	}

	$: itemsWithDate = day.items.filter((item: TripDayItem) => item.start && item.end);

	const getItemHeight = (item: TripDayItem) => {
		if (!item.start || !item.end) {
			return 0;
		}

		const start = new Date(item.start);
		const end = new Date(item.end);

		const itemLengthInMinutes = (end.getTime() - start.getTime()) / 60000;

		return itemLengthInMinutes * minuteLengthInPx;
	};

	const getItemTopPosition = (item: TripDayItem) => {
		if (!item.start) {
			return 0;
		}

		const startDate = new Date(item.start);
		const startDateInMinutes = startDate.getHours() * 60 + startDate.getMinutes();

		return startDateInMinutes * minuteLengthInPx + 10;
	};
</script>

<div class=" flex flex-1 flex-col gap-4">
	<div class="h-full w-full overflow-y-auto rounded-lg">
		<div class="relative flex max-h-[500px] flex-col gap-8 overflow-y-auto pr-4">
			{#each hours as _, hour}
				<div class="flex h-[20px] items-center gap-2">
					<div class="w-10 text-right text-sm text-gray-500">
						{hour.toString().padStart(2, '0')}:00
					</div>
					<div class="flex h-full w-full flex-col justify-center">
						<div class="border-b-[0.5px] border-gray-200"></div>
						<div class="border-t-[0.5px] border-gray-200"></div>
					</div>
				</div>
			{/each}

			{#each itemsWithDate as item}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => openDialog(item)}
					class="absolute left-[50px] z-10 w-[70%] rounded-lg bg-primary p-2 text-white"
					style="height: {getItemHeight(item)}px; top: {getItemTopPosition(item)}px">
					<div>
						<div class="flex space-x-1">
							<h2
								class="text-md scroll-m-20 font-semibold tracking-tight transition-colors first:mt-0">
								{item.name}
							</h2>
							<span class="text-sm text-background">{item.cost}$</span>
						</div>

						{#if item.description}
							<p class="mt-2 flex items-center text-sm text-background">{item.description}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger></Dialog.Trigger>
	<Dialog.Content>
		{#if form}
			<TripDayItemForm data={form} />
		{/if}
	</Dialog.Content>
</Dialog.Root>
