'use server';

import { setCookieToHeaders } from '@/lib/auth-cookies';
import { Action, Source } from '@/types/types';

const DATA_URL = new URL(process.env.NEXTDATA_URL || '');

async function loadSources<T extends string>(id?: T) {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = id
      ? `${DATA_URL.origin}/source/${id}`
      : `${DATA_URL.origin}/source`;
    const response = await fetch(url, {
      headers,
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch sources');
    }
    return response.json() as Promise<T extends string ? Source : Source[]>;
  } catch (e) {
    console.error('Error loading sources: ', e);
  }
}

async function loadActions<T extends string>(id?: T) {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = id
      ? `${DATA_URL.origin}/action/${id}`
      : `${DATA_URL.origin}/action`;
    const response = await fetch(url, {
      headers,
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch actions');
    }
    return response.json() as Promise<
      T extends string ? Omit<Action, 'events'> : Action[]
    >;
  } catch (e) {
    console.error('Error loading actions: ', e);
  }
}

export { loadSources, loadActions };
