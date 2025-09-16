import { Button } from '@/components/ui/button';
import { cn } from '@/lib';

type PlusEntityProps = {
  description: string;
  className?: string;
};

export default function PlusEntity({
  description,
  className,
}: PlusEntityProps) {
  return (
    <Button
      className={cn(className, 'text-4xl rounded-full w-10 h-10')}
      title={description}
    >
      +
    </Button>
  );
}
