'use server';

import { ActioDto, Action, FilterParams, Paginated } from '@/types/types';
import { COOKIE_NAME, DATA_URL, setCookieToHeaders } from '@/lib';
import { graphqlClient } from '@/lib/graphql-client';
import { gql } from '@apollo/client';

export async function loadActions<T extends string | undefined>(
  id?: T,
  sourceId?: string,
  filter?: FilterParams
): Promise<
  T extends string ? Action | undefined : Paginated<Action> | undefined
> {
  try {
    if (id) {
      const { data } = await graphqlClient.query<{ action: Action }>({
        query: gql`
          query Action($id: String!) {
            action(id: $id) {
              id
              publicId
              name
            }
          }
        `,
        variables: { id },
      });
      return data?.action as T extends string ? Action : never;
    }

    const { data } = await graphqlClient.query<{ actions: Paginated<Action> }>({
      query: gql`
        query Actions($sourceId: String, $pagination: PaginationInput!) {
          actions(pagination: $pagination, sourceId: $sourceId) {
            total
            results {
              id
              name
            }
          }
        }
      `,
      variables: { sourceId, pagination: filter },
    });
    return data?.actions as T extends string ? never : Paginated<Action>;
  } catch (e) {
    console.error('Error loading actions: ', e);
  }
}

export async function createAction(
  data: ActioDto
): Promise<Action | undefined> {
  try {
    const headers = await setCookieToHeaders(COOKIE_NAME);
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
    const headers = await setCookieToHeaders(COOKIE_NAME);
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
