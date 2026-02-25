/**
 * MODULE REGISTRY
 *
 * Responsibility:
 * Stores registered modules and their manifests.
 *
 * Architectural role:
 * Platform Registry Layer
 *
 * Rules:
 * - Modules register themselves here
 * - Platform reads from here
 * - Modules must NOT read registry directly
 */

import { ModuleManifestBase } from '@/shared/index';

type AnyModuleManifest = ModuleManifestBase<string>;

class Registry {
  private modules: AnyModuleManifest[] = [];

  resgister(module: AnyModuleManifest) {
    this.modules.push(module);
  }

  getModules() {
    return this.modules;
  }
}

export const ModuleRegistry = new Registry();
