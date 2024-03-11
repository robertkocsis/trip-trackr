import { z } from 'zod';

export const signupFormSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirm: z.string().min(8, 'Password must be at least 8 characters')
	})
	.refine((data) => data.password === data.confirm, "Passwords don't match.");

export type SignupFormSchema = typeof signupFormSchema;
