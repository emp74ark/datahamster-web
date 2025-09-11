'use server';

import { setCookieToHeaders } from '@/lib/auth-cookies';

const DATA_URL = new URL(process.env.NEXTDATA_URL || '');

async function loadSources(id?: string) {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = id
      ? `${DATA_URL.origin}/source/${id}`
      : `${DATA_URL.origin}/source`;
    const response = await fetch(url, {
      headers,
      credentials: 'include',
    });
    return response.json();
  } catch (e) {
    console.error('Error loading sources: ', e);
  }
}

async function loadActions(id?: string) {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = id
      ? `${DATA_URL.origin}/action/${id}`
      : `${DATA_URL.origin}/action`;
    const response = await fetch(url, {
      headers,
      credentials: 'include',
    });
    return response.json();
  } catch (e) {
    console.error('Error loading actions: ', e);
  }
}

export { loadSources, loadActions };
