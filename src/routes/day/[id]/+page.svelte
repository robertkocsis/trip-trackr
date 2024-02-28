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

	$: {
		console.log(data);
		data.form.data = {
			name: selectedActivity?.name ?? '',
			cost: selectedActivity?.cost?.amount ?? 0,
			description: selectedActivity?.description ?? ''
		};
	}
</script>

<div class="grid grid-flow-col grid-cols-2">
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
			<ActivityCard activity={selectedActivity}></ActivityCard>
		{/if}
		{#if !selectedActivity}
			<ActivityCard activity={data.day.activities[0]}></ActivityCard>
		{/if}
	</div>
</div>
