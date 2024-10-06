<script lang="ts">
	import Button from '$components/ui/button/button.svelte';

	import { goto } from '$app/navigation';
	import SplitWrapper from '$components/custom/split-wrapper/SplitWrapper.svelte';
	import type { Trip } from '$lib/entities/Trip';
	import { formatDate } from '$lib/utils/date.util';

	const mockTrips: Trip[] = [
		{
			id: '1',
			days: [],
			user: 'asdasd',
			name: 'Trip to Italy',
			start: '2021-01-01',
			end: '2021-01-02'
		},
		{
			id: '2',
			days: [],
			user: 'asdasd',
			name: 'Trip to Montenegro',
			start: '2021-01-01',
			end: '2021-01-02'
		},
		{
			id: '3',
			days: [],
			user: 'asdasd',
			name: 'Trip to France',
			start: '2021-01-01',
			end: '2021-01-02'
		},
		{
			id: '4',
			days: [],
			user: 'asdasd',
			name: 'Trip to Germany',
			start: '2021-01-01',
			end: '2021-01-02'
		}
	];
</script>

<SplitWrapper showSignUp>
	<div class="mx-auto flex h-full w-full flex-col justify-center space-y-10 bg-background">
		<div class="mx-auto flex flex-col items-center justify-center gap-6">
			<h3
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight text-foreground transition-colors">
				Check out what other people are planning
			</h3>
			<div class="flex flex-col items-center justify-center gap-4 sm:w-[550px]">
				{#each mockTrips as trip}
					<div class="flex w-[450px] cursor-pointer flex-col rounded-lg bg-foreground px-4 py-6">
						<div class="flex space-x-1">
							<h2 class="text-xl font-medium text-primary-foreground">
								{trip.name}
							</h2>
							<span class="text-sm text-muted">10$</span>
						</div>

						<p class="flex items-center whitespace-pre-line text-sm text-muted">
							{formatDate(new Date(trip.start))} - {formatDate(new Date(trip.end))} (5 days)
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</SplitWrapper>
