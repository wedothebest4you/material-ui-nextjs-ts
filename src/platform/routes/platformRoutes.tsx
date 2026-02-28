/**
 * Platform route aggregator.
 * Platform imports modules.
 */

import { ModuleRegistry } from '../services/ModuleRegistry';

export function resolveRoute(path: string) {
  for (const module of ModuleRegistry.getModules()) {
    // const routes = module.getRoutes();
    // const match = routes.find((r) => r.path === path);
    //   if (match) {
    //     return match.component;
    //   }
  }

  return null;
}
