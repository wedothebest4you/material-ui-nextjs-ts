import { PlatformProvider } from '@/platform/index';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PlatformProvider>{children}</PlatformProvider>;
}
