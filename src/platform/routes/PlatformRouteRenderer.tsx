import { notFound } from 'next/navigation';
import { resolveRouteByPath } from '../services/resolveRouteByPath';

type Props = {
  slug?: string[];
};

export default async function PlatformRouteRenderer({ slug = [] }: Props) {
  const path = '/' + (slug?.join('/') ?? '');
  const route = resolveRouteByPath(slug[0], path);

  if (!route?.component) {
    return notFound();
  }

  const Component = (await route.component()).default;

  return <Component />;
}
