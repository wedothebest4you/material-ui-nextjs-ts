// The Shell is mounted once at the ERP boundary using a route group.

import Shell from '@/platform/ui/Shell';

export default function ErpLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
