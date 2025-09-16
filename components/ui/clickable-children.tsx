import {
  Children,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  PropsWithChildren,
} from 'react';

export function ClickableChildren({
  children,
  onClick,
}: PropsWithChildren<{ onClick: () => void }>) {
  return Children.map(children, (child) => {
    if (isValidElement<HTMLAttributes<HTMLElement>>(child)) {
      return cloneElement(child, { onClick });
    }
    return child;
  });
}
