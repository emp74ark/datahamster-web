import { loadSources } from '@/lib/data-load';
import PageTitle from '@/components/ui/page-title';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ sourceId: string }>;
};

export default async function Page(props: PageProps) {
  const { sourceId } = await props.params;
  const source = await loadSources(sourceId);
  return (
    <>
      <PageTitle>{source?.title}</PageTitle>
      <p className="text-neutral-500 mb-5">{source?.description}</p>
      <h3 className='text-lg'>Actions</h3>
      <ul className='sticky top-2'>
        {source?.actions?.map(({ id, name }) => (
          <li key={id} className="bg-accent w-60 p-2 rounded-sm my-2 hover:bg-accent/80" >
            <Link href={`/sources/${sourceId}?action=${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
