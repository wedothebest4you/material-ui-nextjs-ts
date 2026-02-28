import modules from './ModuleRegistry';
import { RouteNode } from '@/shared/index';

export default function resolveNavigation(granted: string[]) {
  let result: { title: string; path: string }[] = [];

  for (const mod of modules) {
    result = result.concat(extract(mod.routes, granted, mod.namespace));
  }

  return result;
}

function extract(
  nodes: RouteNode[],
  granted: string[],
  base: string,
): { title: string; path: string }[] {
  let result: any[] = [];

  for (const node of nodes) {
    const fullPath = `${base}/${node.segment}`;

    if (node.showInNavigation && granted.includes(fullPath)) {
      result.push({
        title: node.shortDescription,
        path: `/${fullPath}`,
      });
    }

    if (node.children) {
      result = result.concat(extract(node.children, granted, fullPath));
    }
  }

  return result;
}
