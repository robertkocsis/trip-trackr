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

	export let data: SuperValidated<Infer<TripDayItemFormSchema>>;
	let closeWrapper: HTMLDivElement;

	$: console.log(data.data);

	const form = superForm(data, {
		validators: zodClient(dayItemFormSchema),

		onSubmit: ({ formData }) => {
			if (data.data.id) {
				formData.set('id', data.data.id);
			}
		},
		onUpdated: (event) => {
			if (event.form.valid) {
				closeWrapper.click();
			}
		}
	});

	const { form: formData, enhance: superEnhance } = form;
</script>

<Dialog.Header>
	<Dialog.Title>delete</Dialog.Title>
	<Dialog.Description>
		<form method="POST" use:superEnhance action="?/persist">
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="flex w-full gap-2">
				<Form.Field {form} name="cost" class="w-1/2">
					<Form.Control let:attrs>
						<Form.Label>Cost</Form.Label>
						<Input {...attrs} bind:value={$formData.cost} type="number" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<div class="flex w-1/2 gap-2">
					<div class="space-y-2">
						<div
							class="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[fs-error]:text-destructive">
							Start
						</div>
						<div class="flex gap-2">
							<Form.Field {form} name="startHours">
								<Form.Control let:attrs>
									<Input {...attrs} bind:value={$formData.startHours} />
								</Form.Control>
								<Form.FieldErrors class="max-w-[40px]" />
							</Form.Field>

							<Form.Field {form} name="startMinutes">
								<Form.Control let:attrs>
									<Input {...attrs} bind:value={$formData.startMinutes} />
								</Form.Control>
								<Form.FieldErrors class="max-w-[40px]" />
							</Form.Field>
						</div>
					</div>

					<div class="space-y-2">
						<div
							class="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[fs-error]:text-destructive">
							End
						</div>

						<div class="flex gap-2">
							<Form.Field {form} name="endHours">
								<Form.Control let:attrs>
									<Input {...attrs} bind:value={$formData.endHours} />
								</Form.Control>
								<Form.FieldErrors class="max-w-[40px]" />
							</Form.Field>
							<Form.Field {form} name="endMinutes">
								<Form.Control let:attrs>
									<Input {...attrs} bind:value={$formData.endMinutes} />
								</Form.Control>
								<Form.FieldErrors class="max-w-[40px]" />
							</Form.Field>
						</div>
					</div>
				</div>
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
					{#if data.data.id}
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
							<input type="hidden" name="id" value={data.data.id} />
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
