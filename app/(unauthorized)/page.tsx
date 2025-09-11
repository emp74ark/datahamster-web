import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex flex-col gap-5'>
      <h1>welcome</h1>
      <Link href="/auth/login">login</Link>
      <Link href="/auth/signup">signup</Link>
    </div>
  );
}
