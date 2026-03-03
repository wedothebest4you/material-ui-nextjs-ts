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
 * - module identity
 * - routes with components
 * - navigation - resolved from routes
 */

import { ModuleDefinition } from '@/shared/types/index';

export const financeModule: ModuleDefinition = {
  finance: {
    routesbyId: {
      '1': {
        routeId: '1',
        parentId: null,
        lineItemId: 1,
        segment: 'ledger',
        fullPath: '/finance/ledger',
        shortDescription: 'Ledger',
        longDescription: 'Ledger management module.',
        showInNavigation: true,
      },
      '2': {
        routeId: '2',
        parentId: '1',
        lineItemId: 2,
        segment: 'list',
        fullPath: '/finance/ledger/list',
        component: () => import('../ui/LedgerListPage'),
        shortDescription: 'View Ledger',
        longDescription: 'Allows user to browse ledger records.',
        showInNavigation: false,
      },

      '3': {
        routeId: '3',
        parentId: '1',
        lineItemId: 3,
        segment: 'new',
        fullPath: '/finance/ledger/new',
        component: () => import('../ui/LedgerCreateForm'),
        shortDescription: 'Create Ledger',
        longDescription: 'Allows user to create new ledger entries.',
        showInNavigation: false,
      },

      '4': {
        routeId: '4',
        parentId: '1',
        lineItemId: 4,
        segment: ':id',
        fullPath: '/finance/ledger/:id',
        component: () => import('../ui/LedgerEditDialog'),
        shortDescription: 'Edit Ledger',
        longDescription: 'Allows user to edit ledger entries.',
        showInNavigation: false,
      },
    },
    routesbyPath: {},
    navigation: {},
  },
};

export default financeModule;
