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

import { registerModules } from './services/registerModules';

let bootstrapped = false;

export function bootstrapPlatform() {
  if (bootstrapped) return;

  registerModules();

  bootstrapped = true;
}
