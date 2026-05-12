import { ReactNode } from 'react';
import PlatformShell from '../shell/PlatformShell';

export default function PlatformShellAdapter({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlatformShell>{children}</PlatformShell>
      </body>
    </html>
  );
}
