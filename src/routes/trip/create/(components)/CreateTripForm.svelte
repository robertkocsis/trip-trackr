<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Textarea } from '$components/ui/textarea';
	import { Input } from '$components/ui/input';
	import * as Popover from '$components/ui/popover';
	import { RangeCalendar } from '$components/ui/range-calendar';
	import * as Form from '$lib/components/ui/form';
	import { cn } from '$lib/utils';
	import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
	import type { DateRange } from 'bits-ui';
	import { CalendarIcon } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createTripSchema } from '../(util)/createTrip.schema';
	import Label from '$components/ui/label/label.svelte';

	const form = superForm(
		{
			name: 'My New Trip',
			description: '',
			start: '',
			end: ''
		},
		{
			validators: zodClient(createTripSchema)
		}
	);

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	let value: DateRange | undefined = {
		start: today(getLocalTimeZone()).add({ days: 20 }),
		end: today(getLocalTimeZone()).add({ days: 24 })
	};

	$: {
		$formData.start = value?.start?.toString() ?? '';
		$formData.end = value?.end?.toString() ?? '';
	}

	const minDate = today(getLocalTimeZone());

	const { form: formData, enhance, message, errors } = form;
</script>

<form method="POST" use:enhance>
	<div class="flex space-x-2">
		<Form.Field {form} name="name" class="flex-1">
			<Form.Control let:attrs>
				<Form.Label>
					<Label>Name</Label>
				</Form.Label>
				<Input {...attrs} bind:value={$formData.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<div class="flex-1 space-y-2">
			<Popover.Root openFocus>
				<Label>Dates</Label>
				<Popover.Trigger asChild let:builder>
					<Button
						variant="outline"
						class={cn(
							'w-min-[300px] w-full justify-start text-left font-normal',
							!value && 'text-muted-foreground'
						)}
						builders={[builder]}>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{#if value && value.start}
							{#if value.end}
								{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
									value.end.toDate(getLocalTimeZone())
								)}
							{:else}
								{df.format(value.start.toDate(getLocalTimeZone()))}
							{/if}
						{:else}
							Pick a date
						{/if}
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" align="start">
					<RangeCalendar
						bind:value
						minValue={minDate}
						initialFocus
						numberOfMonths={2}
						placeholder={value?.start} />
				</Popover.Content>
			</Popover.Root>

			{#if $errors}
				{#if $errors.start}
					<p class="text-sm font-medium text-destructive">{$errors.start[0]}</p>
				{:else if $errors.end}
					<p class="text-sm font-medium text-destructive">{$errors.end[0]}</p>
				{/if}
			{/if}

			<input type="hidden" name="start" bind:value={$formData.start} />
			<input type="hidden" name="end" bind:value={$formData.end} />
		</div>
	</div>

	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>
				<Label>Description</Label>
			</Form.Label>
			<Textarea
				{...attrs}
				bind:value={$formData.description}
				placeholder="A trip where I will have an unforgettable experience." />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if $message}
		<p class="text-sm text-destructive">{$message}</p>
	{/if}

	<Form.Button class="w-full">Create</Form.Button>
</form>
