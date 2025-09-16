import { signIn } from 'next-auth/react';
import {
  LoginFormSchema,
  SignupFormSchema,
  SignupFormSchemaType,
  usernameSignup,
} from '@/lib';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { FormActionState } from '@/types/types';

export async function loginFormHandler(
  state: FormActionState | null,
  formData: FormData
) {
  const validate = await LoginFormSchema.safeParseAsync({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (validate.error) {
    const pretty = z.prettifyError(validate.error);
    return {
      success: false,
      message: pretty,
    };
  }

  const response = await signIn('credentials', {
    ...validate.data,
    redirect: false,
  });

  if (response?.error) {
    return { success: false, message: response.error };
  }

  redirect('/dashboard');
}

export async function signupFormHandler(
  state: FormActionState | null,
  formData: FormData
) {
  const validate = await SignupFormSchema.safeParseAsync({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeat-password'),
  });

  if (validate.error) {
    const pretty = z.prettifyError(validate.error);
    return {
      success: false,
      message: pretty,
    };
  }

  const response = await usernameSignup(<
    Omit<SignupFormSchemaType, 'repeatPassword'>
  >{ ...validate.data });

  if (response['message'] && response['error']) {
    return { success: false, message: response.message };
  }

  await signIn('credentials', {
    ...validate.data,
    redirect: false,
  });

  redirect('/dashboard');
}
