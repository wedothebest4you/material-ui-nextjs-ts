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
