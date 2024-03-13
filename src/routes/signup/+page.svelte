<script>
	import { fade } from 'svelte/transition';
	import SignupForm from './(components)/SignupForm.svelte';
</script>

<main class="grid min-h-screen grid-cols-2" in:fade>
	<div class="flex min-h-screen flex-col bg-foreground pl-8 pt-20">
		<h1 class="mb-4 text-9xl font-bold text-background">Trip Trackr</h1>
		<p class="mb-8 ml-4 text-xl text-background opacity-80">
			Track and manage your trips with ease!
		</p>
	</div>
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 bg-background sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
			<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
		</div>
		<div class="sm:w-[350px]">
			<SignupForm />
		</div>

		<p class="px-8 text-center text-sm text-muted-foreground">
			By clicking continue, you agree to our{' '}
			<a href="/terms" class="underline underline-offset-4 hover:text-primary">Terms of Service</a>
			{' '}
			and{' '}
			<a href="/privacy" class="underline underline-offset-4 hover:text-primary">Privacy Policy</a>
			.
		</p>

		<p class="px-8 text-center text-sm text-muted-foreground">
			Already have an account?
			<a href="/login" class="underline underline-offset-4 hover:text-primary">Log in</a>
		</p>
	</div>
</main>
