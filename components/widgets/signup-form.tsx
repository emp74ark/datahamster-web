'use client';

import { useActionState } from 'react';
import { signupFormHandler } from '@/lib';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SignupForm() {
  const [formState, signupAction, isPending] = useActionState(
    signupFormHandler,
    null
  );

  return (
    <form action={signupAction}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Create new account</CardTitle>
          <CardDescription>
            Enter your username, email and password to create a new account
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="/auth/login">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                autoComplete="username"
                placeholder="username"
                required
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="email"
                required
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="password"
                required
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="repeat-password">Repeat password</Label>
              <Input
                id="repeat-password"
                type="password"
                name="repeat-password"
                autoComplete="new-password"
                required
                disabled={isPending}
              />
            </div>
            {formState?.success === false && (
              <Alert variant="destructive">
                <AlertDescription>{formState.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an account
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
