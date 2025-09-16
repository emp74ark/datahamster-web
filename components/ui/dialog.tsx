'use client';

import { ComponentProps, Fragment, ReactNode, useRef } from 'react';
import { ClickableChildren } from '@/components/ui/clickable-children';

export default function Dialog({
  trigger,
  children,
  ...props
}: ComponentProps<'dialog'> & { trigger: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleOpen() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  function handleClose() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  return (
    <>
      <ClickableChildren onClick={handleOpen}>{trigger}</ClickableChildren>
      <dialog ref={dialogRef} {...props}>
        <div className="fixed inset-0 w-full h-full bg-neutral-800/80 backdrop-blur-xs flex justify-center items-center">
          <div className="relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-2 text-2xl text-accent-foreground/80 hover:text-accent-foreground focus:text-accent-foreground"
            >
              &times;
            </button>
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
