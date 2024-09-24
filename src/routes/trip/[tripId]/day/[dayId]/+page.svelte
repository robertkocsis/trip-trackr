<script lang="ts">
	import TripHeader from '$components/custom/trip-header/TripHeader.svelte';
	import Button from '$components/ui/button/button.svelte';
	import * as Card from '$components/ui/card';
	import type { DayItem } from '$lib/entities/DayItem';
	import type { PageData } from './$types';

	export let data: PageData;
	export let selectedActivity: DayItem | undefined = undefined;

	const createItem = async () => {
		const response = await fetch(`/api/day/${data.day.id}/items`, {
			method: 'POST'
		});
		const item = await response.json();
		data.day.items = [...data.day.items, item];

		selectedActivity = item;
	};

	const minuteLengthInPx = 0.86;

	const items: DayItem[] = [
		{
			id: '1',
			name: 'Item 1',
			cost: 10,
			startDate: '2024-01-01T08:00:00',
			endDate: '2024-01-01T10:00:00',
			description: 'This is a description'
		},
		{
			id: '2',
			name: 'Item 2',
			cost: 20,
			startDate: '2024-01-01T14:00:00',
			endDate: '2024-01-01T16:00:00',
			description: 'This is a description'
		},
		{
			id: '3',
			name: 'Item 3',
			cost: 30,
			startDate: '2024-01-01T18:37:00',
			endDate: '2024-01-01T20:15:00',
			description: 'This is a description'
		}
	];

	$: itemsWithDate = data.day.items.filter((item: DayItem) => item.startDate && item.endDate);
	$: itemsWithoutDate = data.day.items.filter((item: DayItem) => !item.startDate && !item.endDate);

	const getItemHeight = (item: DayItem) => {
		if (!item.startDate || !item.endDate) {
			return 0;
		}

		const startDate = new Date(item.startDate);
		const endDate = new Date(item.endDate);

		const itemLengthInMinutes = (endDate.getTime() - startDate.getTime()) / 60000;

		return itemLengthInMinutes * minuteLengthInPx;
	};

	const getItemTopPosition = (item: DayItem) => {
		if (!item.startDate) {
			return 0;
		}

		const startDate = new Date(item.startDate);
		const startDateInMinutes = startDate.getHours() * 60 + startDate.getMinutes();

		return startDateInMinutes * minuteLengthInPx + 10;
	};

	const calculateDayCost = () => {
		let cost = 0;
		data.day.items.forEach((item: DayItem) => {
			if (item.cost) {
				cost += item.cost;
			}
		});
		return cost;
	};
</script>

<div class="sticky top-0 z-20 flex items-center gap-4 bg-white py-4">
	<TripHeader trip={data.trip} />
	<div>
		<h2 class="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
			-
		</h2>
	</div>
	<div>
		<div class="flex space-x-1">
			<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				{data.day.name}
			</h2>
			<span class="text-sm text-muted-foreground">{calculateDayCost()}$</span>
		</div>
		<p class="text-sm text-muted-foreground">
			{new Date(data.day.date).toDateString()}
		</p>
	</div>

	<div class="flex items-center space-y-2">
		<Button on:click={createItem} variant="default">Add a new item</Button>
	</div>
</div>

<div class="flex gap-10">
	<div class=" flex flex-1 flex-col gap-4 pt-8">
		<div class="h-full w-full overflow-y-auto rounded-lg">
			<div class="relative flex max-h-[500px] flex-col gap-8 overflow-y-auto pr-4">
				{#each Array(24) as _, hour}
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
					<div
						class="absolute left-[50px] z-10 w-[70%] rounded-lg bg-primary p-2 text-white"
						style="height: {getItemHeight(item)}px; top: {getItemTopPosition(item)}px">
						<div>
							<div class="flex space-x-1">
								<h2
									class="text-md scroll-m-20 font-semibold tracking-tight transition-colors first:mt-0">
									{item.name}
								</h2>
								<span class="text-sm text-muted-foreground">{item.cost}$</span>
							</div>

							{#if item.description}
								<p class="text-sm text-muted-foreground">{item.description}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="ml-auto flex h-full max-h-[500px] max-w-96 flex-col gap-4">
		<div class="pr-4">
			<h3 class="text-lg font-semibold">Open-ended activities</h3>
			<h4 class="text-xs text-muted-foreground">
				These are activities that are not time specific, but you still want to keep track of them.
				These can also include general expenses, that you want to track. (eg. a taxi ride)
			</h4>
		</div>

		<div class="flex flex-col gap-4 overflow-y-auto pr-4">
			{#each itemsWithoutDate as item}
				<div class="rounded-lg bg-primary p-2 text-white">
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
			{/each}
			{#if itemsWithoutDate.length === 0}
				<p class="text-sm text-muted-foreground">You don't have any open-ended activities yet</p>
			{/if}
		</div>
	</div>
</div>
