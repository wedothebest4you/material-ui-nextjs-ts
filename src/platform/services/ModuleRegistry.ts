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

import { ModuleDefinition } from '@/shared/types';

export default class ModuleRegistry {
  static modules: ModuleDefinition[] = [];

  static register(module: ModuleDefinition) {
    this.modules.push(module);
  }

  static getModuleRegistry() {
    return this.modules;
  }
}
