import { loadSources } from '@/lib/data-load';
import PageTitle from '@/components/ui/page-title';
import { Table, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ sourceId: string }>;
};

export default async function Page(props: PageProps) {
  const { sourceId } = await props.params;
  const source = await loadSources(sourceId);
  return (
    <section>
      <PageTitle>{source?.title}</PageTitle>
      <p className="text-neutral-500 mb-5">{source?.description}</p>
      <Table>
        <TableHeader>
          <span>Name</span>
        </TableHeader>
        {source?.actions?.map(({ id, name }) => (
          <Link key={id} href={`/sources/${sourceId}/actions/${id}`}>
            <TableRow>{name}</TableRow>
          </Link>
        ))}
      </Table>
    </section>
  );
}
