/**
 * FINANCE MODULE MANIFEST
 *
 * Responsibility:
 * It defines the manifest object for this module.
 * It will be used by platform Registery service.
 *
 * Architectural role:
 * Module Manifest definition Layer
 *
 * Defines:
 * - navigation
 * - permissions
 * - module identity
 */

import type { PermissionMapBase } from '@/shared/types/PermissionMapBase';

import { PermissionOf, NavigationItemBase } from '@/shared/index';
import { ModuleManifestBase } from '@/shared/index';

const permissionMap: PermissionMapBase = {
  LEDGER_VIEW: 'finance.ledger.view',
  LEDGER_CREATE: 'finance.ledger.create',
} as const;

type FinancePermission = PermissionOf<typeof permissionMap>;

const navigation: NavigationItemBase<FinancePermission>[] = [
  {
    id: 'finance',
    label: 'Finance',
    path: '/',
    children: [
      {
        id: 'ledger',
        label: 'Ledger',
        path: '/finance/ledger',
        permission: permissionMap.LEDGER_VIEW,
      },
    ],
  },
];

export const FinanceModule: ModuleManifestBase<FinancePermission> = {
  id: 'finance',
  permissions: permissionMap,
  navigation: navigation,
};
