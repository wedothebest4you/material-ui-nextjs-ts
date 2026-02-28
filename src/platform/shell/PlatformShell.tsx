/**
 * PLATFORM SHELL (SERVER ORCHESTRATION LAYER)
 *
 * Responsibility:
 * - Bootstraps platform
 * - Resolves server-driven routes
 * - Resolves server-driven navigation
 * - Injects routes and navigation into UI shell
 *
 * Architectural role:
 * Platform Orchestration Layer (Server Component)
 *
 * Rules:
 * - Must NOT contain UI logic
 * - Must NOT use React client hooks
 * - Must orchestrate platform services only
 */

import ShellLayout from './ShellLayout';
import bootstrapPlatform from '../services/bootstrapPlatform';
import resolveRoute from '../services/routeResolver';
import canAccess from '../services/routeAccess';
import navigationResolver from '../services/navigationResolver';
import ModuleRegistry from '../services/ModuleRegistry';

export default async function PlatformShell({
  children,
}: {
  children: React.ReactNode;
}) {
  bootstrapPlatform();

  const module = ModuleRegistry.getModuleRegistry();

  const navigation = navigationResolver(['']);

  return <ShellLayout navigation={navigation}>{children}</ShellLayout>;
}
