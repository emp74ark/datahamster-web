import { loadSources } from '@/lib';
import PageTitle from '@/components/ui/page-title';
import Link from 'next/link';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SourceForm from '@/components/widgets/source-form';
import Dialog from '@/components/ui/dialog';
import PlusEntity from '@/components/ui/plus-entity';
import DeleteButton from '@/components/ui/delete-button';

export default async function Page() {
  const sources = await loadSources(undefined);
  return (
    <section>
      <PageTitle>Sources</PageTitle>
      <Dialog
        trigger={
          <PlusEntity
            description="Add new source"
            className="absolute bottom-5 right-5"
          />
        }
      >
        <SourceForm />
      </Dialog>
      <div className="grid grid-cols-4 gap-5">
        {sources?.results?.map(({ id, title, description }) => (
          <div key={id} className="relative">
            <DeleteButton entity="source" id={id} />
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
              <CardFooter>
                <CardAction>
                  <Button asChild variant="outline">
                    <Link href={`/sources/${id}`}>View</Link>
                  </Button>
                </CardAction>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
