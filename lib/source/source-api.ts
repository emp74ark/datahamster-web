'use server';

import { COOKIE_NAME, DATA_URL, setCookieToHeaders } from '@/lib';
import { FilterParams, Paginated, Source } from '@/types/types';
import { graphqlClient } from '@/lib/graphql-client';
import { gql } from '@apollo/client';

export async function loadSources<T extends string | undefined>(
  id?: T,
  filter?: FilterParams
): Promise<
  T extends string ? Source | undefined : Paginated<Source> | undefined
> {
  try {
    if (id) {
      const { data } = await graphqlClient.query<{ source: Source }>({
        query: gql`
          query Source($id: String!) {
            source(id: $id) {
              id
              title
              description
              actions {
                id
                publicId
                name
              }
            }
          }
        `,
        variables: { id },
      });
      return data?.source as T extends string ? Source : never;
    }

    const { data } = await graphqlClient.query<{ sources: Paginated<Source> }>({
      query: gql`
        query Sources($pagination: PaginationInput!) {
          sources(pagination: $pagination) {
            total
            results {
              id
              title
              description
            }
          }
        }
      `,
      variables: {
        pagination: filter || {},
      },
    });
    return data?.sources as T extends string ? never : Paginated<Source>;
  } catch (e) {
    console.error('Error loading source(s): ', e);
  }
}

export async function createSource(
  data: Pick<Source, 'title' | 'description'>
): Promise<Source | undefined> {
  try {
    const headers = await setCookieToHeaders(COOKIE_NAME);
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
    const headers = await setCookieToHeaders(COOKIE_NAME);
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
