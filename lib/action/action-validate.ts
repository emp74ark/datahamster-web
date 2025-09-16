import { z } from 'zod';

export const ActionSchema = z.object({
  sourceId: z.string().uuid(),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .transform((name) => name.trim()),
});
