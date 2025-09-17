'use server';

import {
  AUTH_URL,
  COOKIE_NAME,
  DEFAULT_HEADERS,
  getCookieFromHeaders,
} from '@/lib';

async function usernameLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const url = new URL('/auth/login', AUTH_URL);
    const response = await fetch(url, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ username, password }),
    });

    await getCookieFromHeaders(response.headers, COOKIE_NAME);

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
    const url = new URL('/auth/signup', AUTH_URL);
    const response = await fetch(url, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ username, email, password }),
    });

    await getCookieFromHeaders(response.headers, COOKIE_NAME);

    return response.json();
  } catch (e) {
    console.error('Signup error: ', e);
  }
}

export { usernameLogin, usernameSignup };
