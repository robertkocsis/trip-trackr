<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$components/ui/button';
	import Textarea from '$components/ui/textarea/textarea.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { dayItemFormSchema, type TripDayItemFormSchema } from './schema';

	export let superValidatedData: SuperValidated<Infer<TripDayItemFormSchema>>;
	let closeWrapper: HTMLDivElement;

	const form = superForm(superValidatedData, {
		validators: zodClient(dayItemFormSchema),
		dataType: 'json',
		onSubmit: ({ formData }) => {
			if (superValidatedData.data.id) {
				formData.set('id', superValidatedData.data.id);
			}
		},
		onUpdated: (event) => {
			if (event.form.valid) {
				closeWrapper.click();
			}
		}
	});

	const { form: formData, enhance: superEnhance, errors } = form;
</script>

<Dialog.Header>
	<Dialog.Description>
		<form method="POST" use:superEnhance action="?/persist">
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="cost">
				<Form.Control let:attrs>
					<Form.Label>Cost</Form.Label>
					<Input {...attrs} bind:value={$formData.cost} type="number" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex gap-2">
				<Form.Field {form} name="start" class="w-1/2">
					<Form.Control let:attrs>
						<Form.Label>Start</Form.Label>
						<Input {...attrs} bind:value={$formData.start} maxlength={5} placeholder="HH:MM" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="end" class="w-1/2">
					<Form.Control let:attrs>
						<Form.Label>End</Form.Label>
						<Input {...attrs} bind:value={$formData.end} maxlength={5} placeholder="HH:MM" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.description} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="mt-4 flex">
				<div class="flex-1">
					{#if superValidatedData.data.id}
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								return ({ result }) => {
									if (result.type === 'success') {
										closeWrapper.click();
										invalidateAll();
									}
								};
							}}>
							<input type="hidden" name="id" value={superValidatedData.data.id} />
							<Button variant="destructive" type="submit">Delete</Button>
						</form>
					{/if}
				</div>
				<div class="flex justify-end space-x-2">
					<Dialog.Close>
						<div bind:this={closeWrapper}>
							<Button variant="secondary">Cancel</Button>
						</div>
					</Dialog.Close>
					<Form.Button>Save</Form.Button>
				</div>
			</div>
		</form>
	</Dialog.Description>
</Dialog.Header>
