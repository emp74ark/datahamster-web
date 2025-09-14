'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usernameSignup } from '@/lib';
import { signIn } from 'next-auth/react';
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
  const [errorMessage, setErrorMessage] = useState<string>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    const form = new FormData(formRef.current);
    const username = form.get('username') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const repeatPassword = form.get('repeat-password') as string;

    if (
      !username ||
      !email ||
      !password ||
      !repeatPassword ||
      password !== repeatPassword
    ) {
      setErrorMessage('Check your inputs');
      return;
    }

    const response = await usernameSignup({ username, email, password });
    if (response['message'] && response['error']) {
      setErrorMessage(response.message);
      return;
    }

    await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    router.push('/dashboard');
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
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
              />
            </div>
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
