'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { actionFormAction } from '@/lib';

type ActionFormProps = {
  sourceId: string;
};

export default function ActionForm({ sourceId }: ActionFormProps) {
  const [state, formAction, isPending] = useActionState(
    actionFormAction.bind(null, sourceId),
    null
  );
  return (
    <form action={formAction}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Create new action</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Title</Label>
              <Input id="name" type="text" name="name" disabled={isPending} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button type="submit" disabled={isPending}>
            Create
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
