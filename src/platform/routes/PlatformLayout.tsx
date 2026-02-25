/**
 * PLATFORM ROUTE LAYER (PUBLIC ENTRY POINT)
 *
 * Responsibility:
 * Provides the route adapter that exposes PlatformShell safely to App layer.
 *
 * Architectural role:
 * Platform Route Layer
 *
 * Rules:
 * - This is the ONLY file App can import from Platform
 * - Hides platform shell implementation
 * - Maintains platform internal isolation
 */

import PlatformShell from '../shell/PlatformShell';

export function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <PlatformShell>{children}</PlatformShell>;
}
