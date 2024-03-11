<script lang="ts">
	import { Input } from '$components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginFormSchema } from '../(util)/login.schema';

	const form = superForm(
		{ email: '', password: '' },
		{
			validators: zodClient(loginFormSchema)
		}
	);

	const { form: formData, enhance, message } = form;
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
	{#if $message}
		<p class="text-sm text-destructive">{$message}</p>
	{/if}
	<Form.Button class="w-full">Log In</Form.Button>
</form>
