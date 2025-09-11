import { loadActions } from '@/lib/data-load';

type PageProps = {};

export default async function Page(props: PageProps) {
  const actions = await loadActions();
  console.log(actions);
  return <div>Actions</div>;
}
