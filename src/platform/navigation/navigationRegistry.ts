import { ModuleRegistry } from '../modules/ModuleRegistry';

export class NavigationRegistry {
  //ToDo : Test it
  static getAllNavigation() {
    return ModuleRegistry.getModules().flatMap((m) => m.navigation);
  }
}
