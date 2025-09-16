import { loadActions } from '@/lib';
import PageTitle from '@/components/ui/page-title';
import EventList from '@/components/widgets/event-list';

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
  return <EventList events={action?.events} />;
}
