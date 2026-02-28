import { notFound } from 'next/navigation';
import { resolveRoute, canAccess } from '../index';

// In real app this comes from DB/session
async function getUserGrantedRoutes(): Promise<string[]> {
  return ['finance/ledger', 'finance/ledger/new'];
}

type Props = {
  slug?: string[];
};

export default async function PlatformRouteRenderer({ slug = [] }: Props) {
  const route = resolveRoute(slug);

  if (!route || !route.component) {
    return notFound();
  }

  const fullPath = slug.join('/');

  const granted = await getUserGrantedRoutes();

  if (!canAccess(granted, fullPath)) {
    return <div>Access Denied</div>;
  }

  const Component = route.component;

  return <Component />;
}
