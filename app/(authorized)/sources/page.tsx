import { loadSources } from '@/lib/data-load';
import PageTitle from '@/components/ui/page-title';
import Link from 'next/link';
import { Table, TableHeader, TableRow } from '@/components/ui/table';

export default async function Page() {
  const sources = await loadSources(undefined);
  return (
    <section>
      <PageTitle>Sources</PageTitle>
      <Table>
        <TableHeader>
          <span>Title</span>
          <span>Description</span>
        </TableHeader>
        {sources?.map(({ id, title, description }) => (
          <Link key={id} href={`/sources/${id}`}>
            <TableRow>
              <span>{title}</span>
              <span>{description}</span>
            </TableRow>
          </Link>
        ))}
      </Table>
    </section>
  );
}
