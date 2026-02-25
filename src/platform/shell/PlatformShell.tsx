/**
 * PLATFORM SHELL (SERVER ORCHESTRATION LAYER)
 *
 * Responsibility:
 * - Bootstraps platform
 * - Resolves server-driven navigation
 * - Injects navigation into UI shell
 *
 * Architectural role:
 * Platform Orchestration Layer (Server Component)
 *
 * Rules:
 * - Must NOT contain UI logic
 * - Must NOT use React client hooks
 * - Must orchestrate platform services only
 */

import { bootstrapPlatform } from '../bootstrapPlatform';
import { resolveNavigation } from '../services/NavigationService';
import ShellLayout from './ShellLayout';

export default async function PlatformShell({
  children,
}: {
  children: React.ReactNode;
}) {
  bootstrapPlatform();

  const navigation = await resolveNavigation();

  return <ShellLayout navigation={navigation}>{children}</ShellLayout>;
}
