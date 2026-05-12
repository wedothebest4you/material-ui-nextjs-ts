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

import { ModuleDefinition, RouteNode } from '@/shared/types';
import { IUser } from '@/shared/types';
import {
  RouteDictionarybyRouteId,
  RouteDictionarybyFullPath,
  Navigation,
} from '@/shared/types';

export default class ModuleRegistry {
  static modules: ModuleDefinition = {};

  static register(namespace: string, module: ModuleDefinition, user: IUser) {
    const grantedRoutes = user.grantedRoutes[namespace];
    //console.log(`grantedRoutes : ${grantedRoutes}`);
    let routesbyId: RouteDictionarybyRouteId = module[namespace].routesbyId;

    if (!user.isAdmin) {
      routesbyId = {};
      for (const routeId of grantedRoutes) {
        routesbyId[routeId] = module[namespace].routesbyId[routeId];
      }
    }
    //console.log('routesbyId:');
    // console.log(routesbyId);

    this.modules[namespace] = {
      routesbyId,
      routesbyPath: addRoutesbyFullPath(routesbyId),
      navigation: resolveNavigation(routesbyId),
    };
  }

  static getModuleRegistry() {
    console.log('getModuleRegistry');
    console.log('module registrty');
    console.log(this.modules);
    return this.modules;
  }

  static getModuleList() {
    return Object.keys(this.modules);
  }

  static getNavigation() {
    let navigation: {
      [module: string]: Navigation;
    } = {};
    Object.entries(this.modules).map(([key, value]) => {
      navigation[key] = value.navigation;
    });
    return navigation;
  }
}

function addRoutesbyFullPath(routes: RouteDictionarybyRouteId) {
  let routesbyFullPath: RouteDictionarybyFullPath = {};
  Object.entries(routes).forEach(([, value]) => {
    routesbyFullPath[value.fullPath] = value;
  });
  return routesbyFullPath;
}

export function resolveNavigation(routes: RouteDictionarybyRouteId) {
  // For navigation array, an instance of routes dictionary will be coverted
  // to an array of route objects. And then it will filter on showInNavigation.
  // e.g.
  // > const d = {1:'A',2:'B'}
  // Object.values(d)
  // [ 'A', 'B' ]
  // then the array will filter
  let navigation: Navigation = {};
  Object.values(routes)
    .filter((route) => route.showInNavigation)
    .map((route) => {
      navigation[route.routeId] = {
        fullPath: route.fullPath,
        longDescription: route.longDescription,
      };
    });
  return navigation;
}
