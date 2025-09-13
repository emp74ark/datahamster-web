import { loadEvents } from '@/lib/data-load';
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PageProps = {
  searchParams: Promise<{ pageNumber: string; perPage: string }>;
};

export default async function Page(props: PageProps) {
  const searchProps = await props.searchParams;
  const events = await loadEvents({
    id: undefined,
    filter: {
      pageNumber: Number(searchProps.pageNumber) || 1,
      perPage: Number(searchProps.perPage) || 10,
    },
  });
  const pages = Math.floor(
    (events?.total || 0) / Number(searchProps.perPage || 1)
  );
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);
  const visiblePageNumbers = pageNumbers.slice(
    Number(searchProps.pageNumber) - 1,
    Number(searchProps.pageNumber) + 3
  );
  return (
    <section className="grid grid-rows-[auto_1fr]">
      <PageTitle>Events</PageTitle>
      <Table className="h-fit">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Created</TableHeaderCell>
            <TableHeaderCell>IP</TableHeaderCell>
            <TableHeaderCell>Local time</TableHeaderCell>
            <TableHeaderCell>Data</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events?.results?.map(({ id, createdAt, ip, localTime, data }) => (
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
      <Pagination className="mt-5 place-self-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/events?pageNumber=1&perPage=${searchProps.perPage || 10}`}
            />
          </PaginationItem>
          {visiblePageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={`/events?pageNumber=${pageNumber}&perPage=${searchProps.perPage}`}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {visiblePageNumbers.length < pages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={`/events?pageNumber=2&perPage=${searchProps.perPage}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
