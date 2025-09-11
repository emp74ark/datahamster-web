import { PropsWithChildren } from 'react';

type LayoutProps = {};

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  return <div>{props.children}</div>;
}
