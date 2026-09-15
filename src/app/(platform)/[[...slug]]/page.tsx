import { PlatformRouteRenderer } from '@/platform/index';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  console.log('component 1 : page.tx at the catch-all route');
  return <PlatformRouteRenderer slug={(await params).slug} />;
}
