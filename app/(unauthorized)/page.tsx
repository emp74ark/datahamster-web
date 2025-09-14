import Image from 'next/image';
import Link from 'next/link';
import StatsEvent from '@/components/widgets/stats-event';

export default async function Page() {
  return (
    <section className="place-content-center">
      <StatsEvent scope="startPage" />
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
