import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="place-content-center">
      <Image
        src="/hamster-punk.png"
        alt="Hamster punk"
        width={500}
        height={500}
        className="rounded-lg mx-auto"
      />
      <p className="text-center my-5 text-neutral-500 text-lg">
        You&apos;re not authorized. Please <Link href="/auth/login">login</Link>{' '}
        or <Link href="/auth/signup">sign up</Link>
      </p>
    </section>
  );
}
