type PageProps = {
  params: Promise<{ actionId: string }>;
};

export default async function Page(props: PageProps) {
  const { actionId } = await props.params;
  return <div>Action: {actionId}</div>;
}
