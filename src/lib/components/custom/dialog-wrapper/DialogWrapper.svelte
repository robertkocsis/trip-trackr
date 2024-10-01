<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<slot name="trigger" />
	</Dialog.Trigger>
	<Dialog.Content>
		<slot name="content" />
	</Dialog.Content>
</Dialog.Root>
