import { loadActions } from '@/lib/data-load';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@/components/ui/table';
import PageTitle from '@/components/ui/page-title';
import JsonList from '@/components/ui/json-list';

type PageProps = {
  searchParams: Promise<{ action?: string }>;
};

export default async function Page(props: PageProps) {
  const { action: actionId } = await props.searchParams;
  if (!actionId) {
    return (
      <>
        <PageTitle>Events</PageTitle>
        <p className="text-neutral-500">Select an action to view its events.</p>
      </>
    );
  }
  const action = await loadActions(actionId);
  return (
    <>
      <PageTitle>Events</PageTitle>
      <Table>
        <TableHeader>
          <TableHeaderCell>Created</TableHeaderCell>
          <TableHeaderCell>IP</TableHeaderCell>
          <TableHeaderCell>Local time</TableHeaderCell>
          <TableHeaderCell>Data</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {action?.events?.map(({ id, createdAt, ip, localTime, data }) => (
            <TableRow key={id}>
              <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
              <TableCell>{ip}</TableCell>
              <TableCell>{new Date(localTime).toLocaleString()}</TableCell>
              <TableCell className="break-after-all">
                <JsonList data={data} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
