<script lang="ts">
	import { fade } from 'svelte/transition';
	import LoginForm from './(components)/LoginForm.svelte';
</script>

<main class="grid min-h-screen grid-cols-2" in:fade>
	<div class="flex min-h-screen flex-col bg-foreground pl-8 pt-20">
		<h1 class="text-large mb-4 text-9xl font-bold text-background">Trip Trackr</h1>
		<p class="mb-8 ml-4 text-xl text-background opacity-80">
			Track and manage your trips with ease!
		</p>
	</div>
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 bg-background sm:w-[350px]">
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
</main>
