import { signIn } from 'next-auth/react';
import { usernameSignup } from '@/lib/auth-username';

export async function loginFormHandler(
  state: { success: boolean; message: string } | null,
  formData: FormData
) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { success: false, message: 'Check your inputs' };
  }

  const response = await signIn('credentials', {
    username,
    password,
    redirect: true,
  });

  if (response?.error) {
    return { success: false, message: response.error };
  }

  return null;
}

export async function signupFormHandler(
  state: { success: boolean; message: string } | null,
  formData: FormData
) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const repeatPassword = formData.get('repeat-password') as string;

  if (
    !username ||
    !email ||
    !password ||
    !repeatPassword ||
    password !== repeatPassword
  ) {
    return { success: false, message: 'Check your inputs' };
  }

  const response = await usernameSignup({ username, email, password });

  if (response['message'] && response['error']) {
    return { success: false, message: response.message };
  }

  await signIn('credentials', {
    username,
    password,
    redirect: true,
  });

  return null;
}
