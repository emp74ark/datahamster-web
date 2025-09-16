import { FormActionState } from '@/types/types';
import { z } from 'zod';
import { createSource, SourceSchema } from '@/lib';
import { redirect } from 'next/navigation';

export async function createSourceAction(
  state: FormActionState | null,
  formData: FormData
) {
  const validate = await SourceSchema.safeParseAsync({
    title: formData.get('title'),
    description: formData.get('description'),
  });
  if (validate.error) {
    const pretty = z.prettifyError(validate.error);
    return {
      success: false,
      message: pretty,
    };
  }
  await createSource(validate.data);

  redirect('/sources');
}
