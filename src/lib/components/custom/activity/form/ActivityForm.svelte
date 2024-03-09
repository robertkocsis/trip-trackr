<script lang="ts">
	import Textarea from '$components/ui/textarea/textarea.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { createEventDispatcher } from 'svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { activityFormSchema, type ActivityFormSchema } from './schema';

	export let data: SuperValidated<Infer<ActivityFormSchema>>;

	const dispatch = createEventDispatcher();

	const form = superForm(data, {
		validators: zodClient(activityFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				dispatch('editSuccessful');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
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
			<Input {...attrs} bind:value={$formData.cost} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
