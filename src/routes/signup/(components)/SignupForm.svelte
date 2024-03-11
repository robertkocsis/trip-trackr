<script lang="ts">
	import { Input } from '$components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signupFormSchema } from '../(util)/signup.schema';

	const form = superForm(
		{ email: '', password: '', confirm: '' },
		{
			validators: zodClient(signupFormSchema)
		}
	);

	const { form: formData, enhance, message, errors } = form;
</script>

<form method="POST" use:enhance class="space-y-2">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Input {...attrs} placeholder="name@example.com" type="email" bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Input {...attrs} placeholder="Password" type="password" bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="confirm">
		<Form.Control let:attrs>
			<Input
				{...attrs}
				placeholder="Confirm password"
				type="password"
				bind:value={$formData.confirm} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	{#if $message}
		<p class="text-sm text-destructive">{$message}</p>
	{/if}

	{#if $errors._errors}
		<p class="text-sm text-destructive">{$errors._errors}</p>
	{/if}

	<Form.Button class="w-full">Sign Up</Form.Button>
</form>
