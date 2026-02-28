//ToDo: Comment this code

import modules from '../services/ModuleRegistry';
import { RouteNode } from '@/shared/index';

export default function resolveRoute(slug: string[]) {
  for (const mod of modules) {
    const result = matchTree(mod.routes, slug, [mod.namespace]);
    if (result) return result;
  }

  return null;
}

function matchTree(
  nodes: RouteNode[],
  segments: string[],
  acc: string[],
): RouteNode | null {
  if (segments.length === 0) return null;

  const [current, ...rest] = segments;

  for (const node of nodes) {
    if (node.segment === current || node.segment.startsWith(':')) {
      if (rest.length === 0) {
        return node;
      }

      if (node.children) {
        return matchTree(node.children, rest, [...acc, node.segment]);
      }
    }
  }

  return null;
}
