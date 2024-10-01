<script lang="ts">
	import DialogWrapper from '$components/custom/dialog-wrapper/DialogWrapper.svelte';
	import type { TripDay } from '$lib/entities/TripDay';
	import type { TripDayItem } from '$lib/entities/TripDayItem';
	import { formatTripDayItemTime } from '$lib/utils/tripDayItem.util';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superValidate } from 'sveltekit-superforms/client';
	import TripDayItemForm from '../form/DayItemForm.svelte';
	import { dayItemFormSchema } from '../form/schema';

	export let day: TripDay;

	$: itemsWithoutDate = day.items.filter((item: TripDayItem) => !item.start && !item.end);
</script>

<div class="ml-auto flex h-full max-h-[500px] max-w-96 flex-col gap-4">
	<div class="pr-4">
		<h3 class="tendfont-semibold">Open-ended activities</h3>
		<h4 class="text-xs text-muted-foreground">
			These are activities that are not time specific, but you still want to keep track of them.
			These can also include general expenses, that you want to track. (eg. a taxi ride)
		</h4>
	</div>

	<div class="flex flex-col gap-4 overflow-y-auto pr-4">
		{#each itemsWithoutDate as item}
			<DialogWrapper>
				<svelte:fragment slot="trigger">
					<div class="cursor-pointer rounded-lg bg-primary p-2 text-white">
						<div class="h-[60px]">
							<div class="flex space-x-1">
								<h2
									class="text-md scroll-m-20 font-semibold tracking-tight transition-colors first:mt-0">
									{item.name}
								</h2>
								<span class="text-sm text-muted-foreground">{item.cost ?? 0}$</span>
							</div>

							<p class="text-sm text-muted-foreground">
								{item.description ?? ''}
							</p>
						</div>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">
					{#await superValidate(formatTripDayItemTime(item), zod(dayItemFormSchema)) then form}
						<TripDayItemForm data={form} />
					{/await}
				</svelte:fragment>
			</DialogWrapper>
		{/each}
		{#if itemsWithoutDate.length === 0}
			<p class="text-sm text-muted-foreground">You don't have any open-ended activities yet</p>
		{/if}
	</div>
</div>
