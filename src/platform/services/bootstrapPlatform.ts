/**
 * PLATFORM BOOTSTRAP
 *
 * Responsibility:
 * Registers all modules into platform registry.
 *
 * Architectural role:
 * Platform Initialization Layer
 *
 * Rules:
 * - Must run exactly once
 * - Must NOT render UI
 * - Must NOT depend on React
 */

import ModuleRegistry from './ModuleRegistry';
import { financeModuleDefinition } from '@/modules/finance/index';
import { ModuleDefinition } from '@/shared/types';
import { IUser } from '@/shared/types';
import env from '@/env';
console.log('bootstrap loader');
let bootstrapped = false;

export default function bootstrapPlatform(user: IUser) {
  const dashboard: ModuleDefinition = {
    dashboard: {
      routesbyId: {
        db1: {
          routeId: 'db1',
          parentId: null,
          lineItemId: 1,
          segment: '/',
          fullPath: '/',
          component: () => import('../ui/dashboard'),
          shortDescription: 'ERP dashboard',
          longDescription: 'ERP central dashboard',
          showInNavigation: true,
        },
      },
      routesbyPath: {},
      navigation: {},
    },
  };
  if (!bootstrapped) {
    ModuleRegistry.register('dashboard', dashboard, user);
    ModuleRegistry.register('finance', financeModuleDefinition, user);
  }
  bootstrapped = true;
}
