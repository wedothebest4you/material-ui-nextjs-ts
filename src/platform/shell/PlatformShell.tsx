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

export default async function PlatformShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: IUser = {
    email: 'test@gmail.com',
    isAdmin: false,
    grantedRoutes: {
      finance: ['fn1', 'fnl'],
      dashboard: ['db1'],
      admn: ['att'],
    },
  };

  bootstrapPlatform(user);

  // const moduleList = ModuleRegistry.getModuleList();
  // const navigation = ModuleRegistry.getNavigation();
  // console.log('Component : PlatformShell');
  // console.log('Item : Module List');
  // console.log(moduleList);
  // console.log('Item : Navigation');
  // console.log(navigation);

  return (
    // <ShellLayout moduleList={moduleList} navigation={navigation}>
    //   {children}
    // </ShellLayout>
    <ShellLayout>{children}</ShellLayout>
  );
}
