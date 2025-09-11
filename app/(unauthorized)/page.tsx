import Image from 'next/image';

export default function Page() {
  return (
    <div className="mx-auto w-fit my-5">
      <Image src='/hamster-punk.png' alt='Hamster punk' width={500} height={500}/>
    </div>
  );
}
