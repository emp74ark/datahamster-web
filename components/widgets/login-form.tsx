'use client';

import { useActionState } from 'react';
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
import { loginFormHandler } from '@/lib';

export default function LoginForm() {
  const [formState, loginAction, isPending] = useActionState(
    loginFormHandler,
    null
  );

  return (
    <form action={loginAction}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username and password below to login to your account
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="/auth/signup">Sign Up</Link>
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
            {formState?.success === false && (
              <Alert variant="destructive">
                <AlertDescription>{formState?.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
