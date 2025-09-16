import { FormActionState } from '@/types/types';
import { z } from 'zod';
import { createSource, SourceSchema } from '@/lib';
import { redirect } from 'next/navigation';

export async function createSourceAction(
  state: FormActionState | null,
  formData: FormData
) {
  console.log('TITLE', formData.get('title'));
  const validate = await SourceSchema.safeParseAsync({
    title: formData.get('title'),
    description: formData.get('description'),
  });
  console.log('VALIDATE', validate);
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
