<script lang="ts">
	import ActivityCard from '$components/custom/activity/ActivityCard.svelte';
	import ActivityForm from '$components/custom/activity/form/ActivityForm.svelte';
	import DayCard from '$components/custom/day/DayCard.svelte';
	import Button from '$components/ui/button/button.svelte';
	import type { Activity } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	export let selectedActivity: Activity | undefined = undefined;

	const createItem = async () => {
		const response = await fetch(`/api/day/${data.day.id}/items`, {
			method: 'POST'
		});
		const item = await response.json();
		data.day.items = [...data.day.items, item];
	};

	let editMode = false;
</script>

<div class="grid grid-flow-col grid-cols-2">
	<div class="space-y-6">
		<div class="flex flex-col items-start justify-center space-y-8">
			<DayCard
				day={data.day}
				expanded={true}
				on:activitySelected={(params) => (selectedActivity = params.detail.activity)} />
			{#if !data.day.items.length}
				<div class="flex w-full flex-col items-center space-y-2">
					<p>There aren't any items for this day, let's create one!</p>
					<Button on:click={createItem} variant="ghost">Create item</Button>
				</div>
			{:else}
				<div class="flex items-center space-y-2">
					<Button on:click={createItem} variant="ghost">Add item</Button>
				</div>
			{/if}
		</div>
	</div>
	<div>
		{#if selectedActivity}
			{#if editMode}
				<ActivityForm data={data.form} on:editSuccessful={() => (editMode = false)}></ActivityForm>
			{:else}
				<ActivityCard activity={selectedActivity} on:editClicked={() => (editMode = true)}
				></ActivityCard>
			{/if}
		{/if}
		{#if !selectedActivity}
			Please select an activity
		{/if}
	</div>
</div>
