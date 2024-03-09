<script lang="ts">
	import ActivityCard from '$components/custom/activity/ActivityCard.svelte';
	import ActivityForm from '$components/custom/activity/form/ActivityForm.svelte';
	import type { ActivityFormSchema } from '$components/custom/activity/form/schema';
	import DayCard from '$components/custom/day/DayCard.svelte';
	import TripHeader from '$components/custom/trip-header/TripHeader.svelte';
	import type { Activity } from '$lib/entities/Activity';
	import type { TripDay } from '$lib/entities/Day';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	export let data: { day: TripDay; form: SuperValidated<Infer<ActivityFormSchema>> };
	export let selectedActivity: Activity | undefined = undefined;

	let editMode = false;
</script>

<div class="grid grid-flow-col grid-cols-2 px-20 py-14">
	<div class="space-y-6">
		<TripHeader showBackButton></TripHeader>
		<div class="flex justify-start items-center">
			<DayCard
				day={data.day}
				expanded={true}
				on:activitySelected={(params) => (selectedActivity = params.detail.activity)} />
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
