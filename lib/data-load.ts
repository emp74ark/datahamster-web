'use server';

import { setCookieToHeaders } from '@/lib';
import { Action, Event, FilterParams, Paginated, Source } from '@/types/types';

const DATA_URL = new URL(process.env.NEXTDATA_URL || '');

async function loadSources<T extends string | undefined>(
  id?: T,
  filter?: FilterParams
): Promise<
  T extends string ? Source | undefined : Paginated<Source> | undefined
> {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const queryParams = new URLSearchParams();
    if (filter) {
      for (const key in filter) {
        const value = filter[key];
        if (!value) continue;
        queryParams.append(key, value.toString());
      }
    }
    const url = new URL('source', DATA_URL);
    if (!id) {
      url.search = queryParams.toString();
    } else {
      url.pathname += `/${id}`;
    }
    const response = await fetch(url, {
      headers,
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch sources');
    }
    return response.json();
  } catch (e) {
    console.error('Error loading sources: ', e);
  }
}

async function loadActions<T extends string | undefined>(
  id?: T,
  filter?: FilterParams
): Promise<
  T extends string ? Action | undefined : Paginated<Action> | undefined
> {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = new URL('action', DATA_URL);
    if (filter) {
      for (const key in filter) {
        const value = filter[key];
        if (!value) continue;
        url.searchParams.append(key, value.toString());
      }
    }
    if (id) {
      url.pathname += `/${id}`;
    }
    const response = await fetch(url, {
      headers,
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch actions');
    }
    return response.json();
  } catch (e) {
    console.error('Error loading actions: ', e);
  }
}

async function loadEvents<T extends string | undefined>({
  id,
  filter,
}: {
  id?: T;
  filter?: FilterParams;
}): Promise<
  T extends string ? Event | undefined : Paginated<Event> | undefined
> {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = new URL('event', DATA_URL);
    if (filter) {
      for (const key in filter) {
        const value = filter[key];
        if (!value) continue;
        url.searchParams.append(key, value.toString());
      }
    }
    if (id) {
      url.pathname += `/${id}`;
    }
    const response = await fetch(url, {
      headers,
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch actions');
    }
    return response.json();
  } catch (e) {
    console.error('Error loading actions: ', e);
  }
}

export { loadSources, loadActions, loadEvents };
