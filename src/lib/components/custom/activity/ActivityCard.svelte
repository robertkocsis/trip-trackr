<script lang="ts">
	import type { Activity } from '$lib/entities/Activity';

	export let activity: Activity;
</script>

<div class="flex flex-col space-y-10">
	<h2 class="text-3xl font-bold">{activity.name}</h2>

	<div>
		<p class="text-md font-bold">Description:</p>
		<p class="text-sm">{activity.description}</p>
	</div>

	<div>
		<p class="text-md font-bold">Place:</p>
		<p class="text-sm">TODO add something like maps integration etc</p>
	</div>

	<div>
		<p class="text-md font-bold">Cost:</p>
		<p class="text-sm">{activity.cost?.amount} {activity.cost?.currency}</p>
	</div>
</div>
