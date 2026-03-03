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
import { IUser } from '@/shared/types';
import {
  RouteDictionarybyRouteId,
  RouteDictionarybyFullPath,
} from '@/shared/types';

export default class ModuleRegistry {
  static modules: ModuleDefinition = {};

  static register(namespace: string, module: ModuleDefinition, user: IUser) {
    const grantedRoutes = user.grantedRoutes;
    let routesbyId: RouteDictionarybyRouteId = module[namespace].routesbyId;

    if (!user.isAdmin) {
      for (const routeId in grantedRoutes) {
        routesbyId[routeId] = module[namespace].routesbyId[routeId];
      }
    }

    this.modules[namespace] = {
      routesbyId,
      routesbyPath: addRoutesbyFullPath(routesbyId),
      navigation: resolveNavigation(routesbyId),
    };
  }

  static getModuleRegistry() {
    return this.modules;
  }
}

function addRoutesbyFullPath(routes: RouteDictionarybyRouteId) {
  let routesbyFullPath!: RouteDictionarybyFullPath;

  Object.entries(routes).forEach(([key, value]) => {
    routesbyFullPath[value.fullPath] = value;
  });
  return routesbyFullPath;
}

export function resolveNavigation(routes: RouteDictionarybyRouteId) {
  const navigation = Object.entries(routes).filter(
    ([routeId, metaData]) => metaData.showInNavigation,
  );
  return Object.fromEntries(navigation);
}
