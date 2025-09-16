import { loadSources } from '@/lib';
import PageTitle from '@/components/ui/page-title';
import Link from 'next/link';
import PlusEntity from '@/components/ui/plus-entity';
import Dialog from '@/components/ui/dialog';
import ActionForm from '@/components/widgets/action-form';
import DeleteButton from '@/components/ui/delete-button';

type PageProps = {
  params: Promise<{ sourceId: string }>;
};

export default async function Page(props: PageProps) {
  const { sourceId } = await props.params;
  const source = await loadSources(sourceId);
  return (
    <>
      <PageTitle>{source?.title}</PageTitle>
      <Dialog
        trigger={
          <PlusEntity
            description="Add new action"
            className="absolute bottom-5 right-5"
          />
        }
      >
        <ActionForm sourceId={sourceId} />
      </Dialog>
      <p className="text-neutral-500 mb-5">{source?.description}</p>
      <h3 className="text-lg">Actions</h3>
      <ul className="sticky top-2">
        {source?.actions?.map(({ id, name, publicId }) => (
          <li
            key={id}
            className="bg-accent p-2 rounded-sm my-2 hover:bg-accent/80 relative"
          >
            <DeleteButton entity='action' id={id}/>
            <Link className='text-lg' href={`/sources/${sourceId}?action=${id}`}>
              {name}
              <p className='text-xs text-neutral-500/50'>Public ID:</p>
              <p className='text-xs text-neutral-500/50'>{publicId}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
