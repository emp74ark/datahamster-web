'use client';

import { SVGProps } from 'react';
import { deleteAction, deleteSource } from '@/lib';
import Dialog from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

type DeleteButtonProps = {
  entity: string;
  id: string;
};

export default function DeleteButton({ entity, id }: DeleteButtonProps) {
  async function deleteHandler() {
    if (entity === 'action') {
      await deleteAction(id);
    }

    if (entity === 'source') {
      await deleteSource(id);
    }

    window.location.reload();
  }

  return (
    <Dialog
      trigger={
        <TrashIcon
          width="1.5em"
          height="1.5em"
          className="text-red-400/70 hover:text-red-500 cursor-pointer absolute right-2 top-2 bg-accent rounded-full p-1"
        />
      }
    >
      <Card className="w-full max-w-sm mx-auto">
        <CardTitle />
        <CardContent>
          <p>Are you sure you want to delete this {entity}?</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="destructive" onClick={deleteHandler}>
            Yes, let&apos;s do it!
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
