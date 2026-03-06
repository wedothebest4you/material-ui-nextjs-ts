import { PlatformRouteRenderer } from '@/platform/index';

export default function Page({ params }: { params: { slug?: string[] } }) {
  return <PlatformRouteRenderer slug={params.slug} />;
}
