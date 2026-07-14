import { ReactNode } from 'react';
import PlatformShell from '../shell/PlatformShell';

export default function PlatformShellAdapter({
  children,
}: {
  children: ReactNode;
}) {
  return <PlatformShell>{children}</PlatformShell>;
}
