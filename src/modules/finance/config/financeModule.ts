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
      description: 'Finance',
      children: ['dashboards', 'masters'],
    },
    dashboards: {
      description: 'Dashboards',
      children: ['4'],
    },
    masters: {
      description: 'Masters',
      children: ['acctemplate', '5'],
    },
    acctemplate: {
      description: 'Account Template',
      children: ['1', '2', '3'],
    },
    4: {
      description: 'Overview - dashboard',
      fullPath: '/finance',
      component: () => import('../ui/dashboard'),
    },
    1: {
      description: 'Account Template - Create',
      fullPath: '/finance/coa',
      component: () =>
        import('../chart-of-accounts/account-template/ui/account-template-grid'),
    },
    2: {
      description: 'Account Template - Edit',
      fullPath: '/finance/coa',
      component: () =>
        import('../chart-of-accounts/account-template/ui/account-template-grid'),
    },
    3: {
      description: 'Account Template - Delete',
      fullPath: '/finance/coa',
      component: () =>
        import('../chart-of-accounts/account-template/ui/account-template-grid'),
    },
    5: {
      description: 'Create Ledger',
      fullPath: '/finance/ledger/new',
      component: () => import('../ui/LedgerCreateForm'),
    },

    // fn2: {
    //   routeId: 'fn2',
    //   parentId: 'fnl',
    //   lineItemId: 3,
    //   segment: 'list',
    //   fullPath: '/finance/ledger/list',
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
    //   fullPath: '/finance/ledger/:id',
    //   component: () => import('../finance/ui/LedgerEditDialog.jsx'),
    //   shortDescription: 'Edit Ledger',
    //   longDescription: 'Allows user to edit ledger entries.',
    //   showInNavigation: false,
    // },
  },
};

export default financeModule;
