import { loadEvents } from '@/lib/data-load';
import PageTitle from '@/components/ui/page-title';
import EventList from '@/components/widgets/event-list';
import PaginationBar from '@/components/widgets/pagination-bar';

type PageProps = {
  searchParams: Promise<{ pageNumber: string; perPage: string }>;
};

export default async function Page(props: PageProps) {
  const searchProps = await props.searchParams;
  const pageNumber = Number(searchProps.pageNumber) || 1;
  const perPage = Number(searchProps.perPage) || 10;

  const events = await loadEvents({
    id: undefined,
    filter: {
      pageNumber,
      perPage,
    },
  });

  return (
    <section className="grid grid-rows-[auto_1fr]">
      <PageTitle>Events</PageTitle>
      <EventList events={events?.results} />
      <PaginationBar
        entityPrefix="events"
        current={pageNumber}
        perPage={perPage}
        totalResults={events?.total}
      />
    </section>
  );
}
