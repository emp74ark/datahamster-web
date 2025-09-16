'use server';

import { DATA_URL, setCookieToHeaders } from '@/lib';
import { FilterParams, Paginated, Source } from '@/types/types';

export async function loadSources<T extends string | undefined>(
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

export async function createSource(
  data: Pick<Source, 'title' | 'description'>
): Promise<Source | undefined> {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = new URL('source', DATA_URL);
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    console.log('RESPONSE', response);
    return response.json();
  } catch (e) {
    console.error('Error creating source: ', e);
  }
}

export async function deleteSource(id: string): Promise<Source | undefined> {
  try {
    const headers = await setCookieToHeaders('datahamster.sid');
    const url = new URL('source', DATA_URL);
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers,
    });
    return response.json();
  } catch (e) {
    console.error('Error deleting source: ', e);
  }
}
