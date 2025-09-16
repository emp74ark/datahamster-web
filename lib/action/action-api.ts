'use server';

import { ActioDto, Action, FilterParams, Paginated } from '@/types/types';
import { DATA_URL, setCookieToHeaders } from '@/lib';

export async function loadActions<T extends string | undefined>(
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

export async function createAction(
  data: ActioDto
): Promise<Action | undefined> {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = new URL('action', DATA_URL);
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (e) {
    console.error('Error creating action: ', e);
  }
}

export async function deleteAction(id: string): Promise<Action | undefined> {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = new URL('action', DATA_URL);
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  } catch (e) {
    console.error('Error deleting action: ', e);
  }
}
