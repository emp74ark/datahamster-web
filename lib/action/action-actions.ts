import { FormActionState } from '@/types/types';
import { ActionSchema, createAction } from '@/lib';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export async function actionFormAction(
  sourceId: string,
  state: FormActionState | null,
  formData: FormData
) {
  const validate = await ActionSchema.safeParseAsync({
    sourceId,
    name: formData.get('name'),
  });

  if (validate.error) {
    const pretty = z.prettifyError(validate.error);
    return {
      success: false,
      message: pretty,
    };
  }

  await createAction(validate.data);

  redirect(`/sources/${validate.data?.sourceId}`);
}
