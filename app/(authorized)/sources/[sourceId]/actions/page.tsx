import { loadActions } from '@/lib/data-load';
import PageTitle from '@/components/ui/page-title';
import { Table, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ sourceId: string }>;
};

export default async function Page({ params }: PageProps) {
  const actions = await loadActions(undefined);
  const { sourceId } = await params;
  console.log(sourceId, actions);
  return (
    <section>
      <PageTitle>Actions</PageTitle>
      <Table>
        <TableHeader>
          <span>Name</span>
        </TableHeader>
        {actions?.map(({ id, name }) => (
          <Link key={id} href={`/sources/${sourceId}/actions/${id}`}>
            <TableRow>{name}</TableRow>
          </Link>
        ))}
      </Table>
    </section>
  );
}
