import { notFound } from 'next/navigation';
import { resolveRouteByPath } from '../services/resolveRouteByPath';

type Props = {
  slug?: string[];
};

export default async function PlatformRouteRenderer({ slug = [] }: Props) {
  const path = '/' + (slug?.join('/') ?? '');

  console.log(PlatformRouteRenderer.name);
  console.log(`slug[0] ${slug[0]}`);

  const route = resolveRouteByPath(slug[0] || 'dashboard', path);

  if (!route?.component) {
    return notFound();
  }

  const Component = (await route.component()).default;

  return <Component />;
}
