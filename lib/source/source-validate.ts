import { z } from 'zod';

export const SourceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .transform((v) => v.trim()),
  description: z
    .string()
    .optional()
    .transform((v) => v?.trim()),
});
