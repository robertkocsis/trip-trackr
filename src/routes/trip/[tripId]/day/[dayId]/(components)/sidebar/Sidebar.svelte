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

	let dialogOpen = false;
	let superValidatedData: SuperValidated<Infer<TripDayItemFormSchema>> | null = null;

	const openDialog = async (item: TripDayItem) => {
		superValidatedData = await superValidate(formatTripDayItemTime(item), zod(dayItemFormSchema));
		dialogOpen = true;
	};

	$: {
		if (!dialogOpen) {
			superValidatedData = null;
		}
	}

	$: itemsWithoutDate = day.items.filter((item: TripDayItem) => !item.start && !item.end);
</script>

<div class="ml-auto flex h-full max-h-[500px] max-w-96 flex-col gap-4">
	<div class="pr-4">
		<h3 class="tendfont-semibold">Open-ended items</h3>
		<h4 class="text-xs text-muted-foreground">
			These are items that are not time specific, but you still want to keep track of them. These
			can also include general expenses, that you want to track. (eg. a taxi ride)
		</h4>
	</div>

	<div class="flex flex-col gap-4 overflow-y-auto pr-4">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#each itemsWithoutDate as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="cursor-pointer rounded-lg bg-primary p-2 text-white"
				on:click={() => openDialog(item)}>
				<div class="h-[60px]">
					<div class="flex space-x-1">
						<h2 class="text-sm font-medium text-primary-foreground">
							{item.name}
						</h2>
						<span class="text-sm text-neutral-200">{item.cost ?? 0}$</span>
					</div>

					<p class="text-xs text-neutral-200">
						{item.description ?? ''}
					</p>
				</div>
			</div>
		{/each}
		{#if itemsWithoutDate.length === 0}
			<p class="text-sm text-muted-foreground">You don't have any open-ended activities yet</p>
		{/if}
	</div>
</div>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger></Dialog.Trigger>
	<Dialog.Content>
		{#if superValidatedData}
			<TripDayItemForm {superValidatedData} />
		{/if}
	</Dialog.Content>
</Dialog.Root>
