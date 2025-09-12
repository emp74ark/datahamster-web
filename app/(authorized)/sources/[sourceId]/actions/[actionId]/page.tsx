import { loadActions } from '@/lib/data-load';
import { Table, TableHeader, TableRow } from '@/components/ui/table';

type PageProps = {
  params: Promise<{ actionId: string }>;
};

export default async function Page(props: PageProps) {
  const { actionId } = await props.params;
  const action = await loadActions(actionId);
  return (
    <section>
      <Table>
        <TableHeader>
          <span>Created</span>
          <span>IP</span>
          <span>Local time</span>
          <span>Data</span>
        </TableHeader>
      </Table>
      {action?.events?.map(({ id, createdAt, ip, localTime, data }) => (
        <TableRow key={id}>
          <span>{new Date(createdAt).toLocaleString()}</span>
          <span>{ip}</span>
          <span>{new Date(localTime).toLocaleString()}</span>
          <span>{JSON.stringify(data)}</span>
        </TableRow>
      ))}
    </section>
  );
}
