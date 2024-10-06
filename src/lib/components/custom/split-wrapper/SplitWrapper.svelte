<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$components/ui/button';

	export let showSignUp = false;
</script>

<div class="grid min-h-screen grid-cols-2">
	<div class="flex min-h-screen flex-col justify-around bg-foreground pl-14">
		<div class="flex flex-col">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<h1 class="cursor-pointer text-8xl font-bold text-background" on:click={() => goto('/')}>
				trip trackr
			</h1>
			<p class=" text-2xl font-medium text-muted">track and manage your trips with ease!</p>
		</div>

		<div class="flex flex-col space-y-6">
			<div>
				<h4 class="text-xl font-semibold text-background">Ready to travel?</h4>
				<p class="text-md font-normal text-muted">
					Create a trip and add your destinations, activities, and expenses.
				</p>
			</div>
			<div>
				<h4 class="text-xl font-semibold text-background">Traveling with friends?</h4>
				<p class="text-md font-normal leading-7 text-muted">
					You can share your trip with your friends and family and plan your trip together.
				</p>
			</div>

			<div>
				<h4 class="text-xl font-semibold text-background">Looking for inspiration?</h4>
				<p class="text-md font-normal leading-7 text-muted">
					Check out the trips that other people shared.
				</p>
			</div>
		</div>

		<div
			class="flex items-center justify-center gap-3 pr-14"
			style="visibility: {showSignUp ? 'visible' : 'hidden'}">
			<h4 class="flex-1 text-xl font-semibold text-background">Ready to jump in?</h4>
			<Button on:click={() => goto('/signup')} size="lg" variant="outline" class="flex-1">
				Sign Up
			</Button>
			<Button on:click={() => goto('/login')} size="lg" variant="outline" class="flex-1">
				Login
			</Button>
		</div>
	</div>
	<div class="bg-background">
		<slot />
	</div>
</div>
