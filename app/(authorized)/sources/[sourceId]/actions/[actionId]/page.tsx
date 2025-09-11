import { loadActions } from '@/lib/data-load';

type PageProps = {
  params: Promise<{ actionId: string }>;
};

export default async function Page(props: PageProps) {
  const { actionId } = await props.params;
  const action = await loadActions(actionId);
  console.log(action);
  return <div>Action: {actionId}</div>;
}
