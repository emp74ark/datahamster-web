import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center row-span-2 gap-5">
        <h1 className="text-9xl font-bold text-neutral-500 animate-pulse">
          404
        </h1>
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </>
  );
}
