'use server';

import { cookies } from 'next/headers';

export async function getCookieFromHeaders(
  headers: Headers,
  cookieName: string
) {
  const setCookieHeaders = headers.getSetCookie();
  const cookieStore = await cookies();

  setCookieHeaders.forEach((cookieString) => {
    const parts = cookieString.split(';');
    const [nameValue] = parts[0].split('=');
    const name = nameValue.trim();
    const value = parts[0].substring(nameValue.length + 1).trim();

    if (name === cookieName) {
      const cookieOptions: { [key: string]: unknown } = {};
      parts.slice(1).forEach((part) => {
        const [key, val] = part.split('=').map((s) => s.trim());
        const lowerKey = key.toLowerCase();
        if (lowerKey === 'path') cookieOptions.path = val;
        if (lowerKey === 'expires') cookieOptions.expires = new Date(val);
        if (lowerKey === 'httponly') cookieOptions.httpOnly = true;
        if (lowerKey === 'samesite')
          cookieOptions.sameSite = val as 'lax' | 'strict' | 'none';
        if (lowerKey === 'secure') cookieOptions.secure = true;
        if (lowerKey === 'domain') cookieOptions.domain = val;
      });

      cookieStore.set({
        name: name,
        value: value,
        ...cookieOptions,
      });
    }
  });
}

export async function setCookieToHeaders(cookieName: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName)?.value;
  if (!cookie) return;
  const headers = new Headers();
  headers.append('Cookie', `${cookieName}=${cookie}`);
  headers.append('Content-Type', 'application/json');
  return headers;
}
