'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="flex flex-col gap-5 row-span-2 items-center">
      <h1 className='font-bold text-5xl text-red-500'>{error.name}</h1>
      <p className='text-lg'>{error.message}</p>
      <code className='bg-neutral-700 p-5 rounded-sm w-4/6 h-1/2 overflow-auto text-xs'>{error.stack}</code>
      <div className="flex gap-5">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </section>
  );
}
