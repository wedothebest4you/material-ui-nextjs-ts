import { ModuleRegistry } from './ModuleRegistry';
import { getUserPermissions } from './PermissionService';

export async function resolveNavigation() {
  const permissions = await getUserPermissions();

  const modules = ModuleRegistry.getModules();

  const nav = modules.flatMap((m) => m.navigation);

  function filter(items: any[]): any[] {
    return items
      .filter((i) => !i.permission || permissions.includes(i.permission))
      .map((i) => ({
        ...i,
        children: i.children ? filter(i.children) : undefined,
      }));
  }

  return filter(nav);
}
