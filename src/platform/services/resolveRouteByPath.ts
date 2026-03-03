import { modules } from '..';

export function resolveRouteByPath(namespace: string, path: string) {
  const route = modules.getModuleRegistry()[namespace].routesbyPath[path];

  if (!route) return null;

  return route;
}
