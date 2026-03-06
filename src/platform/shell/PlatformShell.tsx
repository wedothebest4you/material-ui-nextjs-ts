/**
 * PLATFORM SHELL (SERVER ORCHESTRATION LAYER)
 *
 * Responsibility:
 * - Bootstraps platform
 * - Resolves user granted routes by server-driven code
 * - Resolves respective navigation by server-driven code
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
import { IUser } from '@/shared/types';
import ModuleRegistry from '../services/ModuleRegistry';

export default async function PlatformShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: IUser = {
    email: 'test@gmail.com',
    isAdmin: false,
    grantedRoutes: {
      finance: ['fn1', 'fn2', 'fnl'],
      // dashboard: ['db1'],
    },
  };

  bootstrapPlatform(user);

  const moduleList = ModuleRegistry.getModuleList();
  const navigatioin = ModuleRegistry.getNavigation();
  console.log('PlatformShell');
  console.log('Module List');
  console.log(moduleList);
  console.log('Navigation');
  console.log(JSON.stringify(navigatioin));

  return (
    <ShellLayout moduleList={moduleList} navigation={navigatioin}>
      {children}
    </ShellLayout>
  );
}
