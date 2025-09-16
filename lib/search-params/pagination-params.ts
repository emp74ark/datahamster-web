import { z } from 'zod';

export const PaginationParams = z.object({
  pageNumber: z.coerce.number(),
  perPage: z.coerce.number(),
});

export type PaginationParamsType = z.infer<typeof PaginationParams>;

export async function getPaginationParams(
  searchParams: unknown
): Promise<PaginationParamsType> {
  const parsedParams = await PaginationParams.safeParseAsync(searchParams);
  if (!parsedParams.success) {
    return { pageNumber: 1, perPage: 10 };
  }
  return parsedParams.data;
}
