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
import { financeModule } from '@/modules/finance/module';

let bootstrapped = false;

export default function bootstrapPlatform() {
  if (!bootstrapped) ModuleRegistry.register(financeModule);
  bootstrapped = true;
}
