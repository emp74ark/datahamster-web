'use server';

import { getCookieFromHeaders } from '@/lib';

const AUTH_URL = new URL(process.env.NEXTAUTH_URL || '');

async function usernameLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(`${AUTH_URL.href}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    await getCookieFromHeaders(response.headers, 'datahamster.sid');

    return response.json();
  } catch (e) {
    console.error('Login error: ', e);
  }
}

async function usernameSignup({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${AUTH_URL.href}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    await getCookieFromHeaders(response.headers, 'datahamster.sid');

    return response.json();
  } catch (e) {
    console.error('Signup error: ', e);
  }
}

export { usernameLogin, usernameSignup };
