<script lang="ts">
	import { fade } from 'svelte/transition';
	import LoginForm from './(components)/LoginForm.svelte';
	import SplitWrapper from '$components/custom/split-wrapper/SplitWrapper.svelte';
</script>

<SplitWrapper>
	<div
		class="mx-auto flex h-full w-full flex-col justify-center space-y-6 bg-background sm:w-[350px]">
		<div class="flex flex-col text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Welcome back!</h1>
		</div>
		<div class="sm:w-[350px]">
			<LoginForm />
		</div>
		<p class="px-8 text-center text-sm text-muted-foreground">
			Don't have an account?
			<a href="/signup" class="underline underline-offset-4 hover:text-primary">Sign Up</a>
		</p>
	</div>
</SplitWrapper>
