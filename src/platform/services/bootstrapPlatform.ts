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
import { IUser } from '@/shared/types';

let bootstrapped = false;

export default function bootstrapPlatform(user: IUser) {
  if (!bootstrapped)
    ModuleRegistry.register('finance', financeModuleDefinition, user);
  bootstrapped = true;
}
