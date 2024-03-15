<script lang="ts">
	import * as Card from '$components/ui/card';
	import CreateTripForm from './(components)/CreateTripForm.svelte';
</script>

<div class="min-w-screen flex min-h-screen flex-col items-center">
	<div class="mt-8 w-[500px]">
		<Card.Root>
			<Card.Header>
				<Card.Title>Start your trip now!</Card.Title>
				<Card.Description>Build your itinerary in minutes.</Card.Description>
			</Card.Header>
			<Card.Content>
				<CreateTripForm />
			</Card.Content>
		</Card.Root>
	</div>
</div>
