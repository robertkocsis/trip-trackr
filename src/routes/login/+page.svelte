<script>
	import Button from '$components/ui/button/button.svelte';
	import { Input } from '$components/ui/input';
</script>

<main class="min-h-screen grid grid-cols-2">
	<div class="pt-20 bg-foreground pl-8 flex flex-col min-h-screen">
		<h1 class="text-9xl font-bold mb-4 text-background text-large">Trip Trackr</h1>
		<p class="mb-8 text-xl text-background opacity-80 ml-4">
			Track and manage your trips with ease!
		</p>
	</div>
	<div class="bg-background mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Welcome back!</h1>
		</div>
		<div class="sm:w-[350px] flex flex-col space-y-2">
			<Input
				id="email"
				placeholder="name@example.com"
				type="email"
				autocapitalize="none"
				autocomplete="email"
				autocorrect="off" />
			<Input id="password" placeholder="Password" type="password" />
			<Button>Log In</Button>
		</div>

		<p class="px-8 text-center text-sm text-muted-foreground">
			Don't have an account?
			<a href="/signup" class="underline underline-offset-4 hover:text-primary">Sign Up</a>
		</p>
	</div>
</main>
