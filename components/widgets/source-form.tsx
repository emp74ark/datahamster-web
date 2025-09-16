'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { createSourceAction } from '@/lib';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SourceForm() {
  const [formState, formAction, isPending] = useActionState(
    createSourceAction,
    null
  );
  return (
    <form action={formAction}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Create new source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" type="text" name="title" disabled={isPending} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                disabled={isPending}
              />
            </div>
            {formState?.success === false && (
              <Alert variant="destructive">
                <AlertDescription>{formState?.message}</AlertDescription>
              </Alert>
            )}
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
