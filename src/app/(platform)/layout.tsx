/**
 * PLATFORM ROUTE MOUNT LAYER
 *
 * Responsibility:
 * Mounts the Platform into the Next.js routing tree.
 *
 * Architectural role:
 * App Route Layer → Platform Route Layer adapter
 *
 * Rules:
 * - Must import ONLY from platform/routes
 * - Must NOT import platform/shell
 * - Must NOT import platform/services
 *
 * This enforces strict isolation between App and Platform internals.
 */

import { ReactNode } from 'react';
import { PlatformShellAdapter } from '@/platform/index';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <PlatformShellAdapter>{children}</PlatformShellAdapter>;
}
