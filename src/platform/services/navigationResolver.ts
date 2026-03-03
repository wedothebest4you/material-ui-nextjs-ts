import ModuleRegistry from '../services/ModuleRegistry';
import { RouteDictionarybyRouteId } from '@/shared/types';

export default function resolveNavigation(routes: RouteDictionarybyRouteId) {
  const modules = ModuleRegistry.getModuleRegistry();
  return Object.values(modules.routes)
    .filter((route) => route.showInNavigation)
    .sort((a, b) => a.lineItemId - b.lineItemId);
}
