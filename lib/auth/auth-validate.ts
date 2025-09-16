import { z } from 'zod';

export const LoginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, {
      message: 'Username must be at least 3 characters long',
    })
    .transform((v) => v.trim()),
  password: z
    .string()
    .trim()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(100, {
      message: 'Password is too long',
    })
    .transform((v) => v.trim()),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const SignupFormSchema = LoginFormSchema.extend({
  email: z.email('Invalid email'),
  repeatPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
}).refine((data) => data.password === data.repeatPassword, {
  message: 'Passwords do not match',
  path: ['repeatPassword'],
});

export type SignupFormSchemaType = z.infer<typeof SignupFormSchema>;
