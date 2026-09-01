import { notFound } from 'next/navigation';
import { resolveRouteByPath } from '../services/resolveRouteByPath';

type Props = {
  slug?: string[];
};

export default async function PlatformRouteRenderer({ slug = [] }: Props) {
  const path = '/' + (slug?.join('/') ?? '');

  console.log(`slug[0] ${slug[0]}`);

  const module =
    slug[0] == '.well-known' || slug[0] == 'favicon.ico' || slug[0] == undefined
      ? 'dashboard'
      : slug[0];

  // const route = resolveRouteByPath(module, path);

  // if (!route?.component) {
  //   return notFound();
  // }

  // const Component = (await route.component()).default;

  // return <Component />;
  return 'Commented out';
}
