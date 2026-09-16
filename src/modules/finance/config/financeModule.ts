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
    toplevelnav: {
      kind: 'group',
      description: 'Finance',
      children: ['dashboards', 'masters'],
    },
    dashboards: {
      kind: 'group',
      description: 'Dashboards',
      children: ['4'],
    },
    masters: {
      kind: 'group',
      description: 'Masters',
      children: ['acctemplate', '5'],
    },
    acctemplate: {
      kind: 'group',
      description: 'Account Template',
      children: ['1', '2', '3'],
    },
    4: {
      kind: 'route',
      description: 'Overview - dashboard',
      routePath: '/finance',
      component: () => import('../ui/dashboard'),
    },
    1: {
      kind: 'route',
      description: 'Account Template - Create',
      routePath: '/finance/coa',
      component: () =>
        import('../chart-of-accounts/account-template/ui/account-template-grid'),
    },
    2: {
      kind: 'route',
      description: 'Account Template - Edit',
      routePath: '/finance/coa',
      component: () =>
        import('../chart-of-accounts/account-template/ui/account-template-grid'),
    },
    3: {
      kind: 'route',
      description: 'Account Template - Delete',
      routePath: '/finance/coa',
      component: () =>
        import('../chart-of-accounts/account-template/ui/account-template-grid'),
    },
    5: {
      kind: 'route',
      description: 'Create Ledger',
      routePath: '/finance/ledger/new',
      component: () => import('../ui/LedgerCreateForm'),
    },

    // fn2: {
    //   routeId: 'fn2',
    //   parentId: 'fnl',
    //   lineItemId: 3,
    //   segment: 'list',
    //   routePath: '/finance/ledger/list',
    //   component: () => import('../ui/LedgerListPage'),
    //   shortDescription: 'View Ledger',
    //   longDescription: 'Allows user to browse ledger records.',
    //   showInNavigation: false,
    // },

    // fn4: {
    //   routeId: 'fn4',
    //   parentId: 'fnl',
    //   lineItemId: 5,
    //   segment: ':id',
    //   routePath: '/finance/ledger/:id',
    //   component: () => import('../finance/ui/LedgerEditDialog.jsx'),
    //   shortDescription: 'Edit Ledger',
    //   longDescription: 'Allows user to edit ledger entries.',
    //   showInNavigation: false,
    // },
  },
};

export default financeModule;
