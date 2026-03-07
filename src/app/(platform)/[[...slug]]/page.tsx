import { PlatformRouteRenderer } from '@/platform/index';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  return <PlatformRouteRenderer slug={(await params).slug} />;
}
