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
import { ComponentType } from 'react';

export const financeModule: ModuleDefinition = {
  finance: {
    routesbyId: {
      fn1: {
        routeId: 'fn1',
        parentId: null,
        lineItemId: 1,
        segment: 'finance',
        fullPath: '/finance',
        component: () => import('../ui/dashboard'),
        shortDescription: 'Finance dashboard',
        longDescription: 'Finance operational dashboard',
        showInNavigation: true,
      },
      fnl: {
        routeId: 'fnl',
        parentId: null,
        lineItemId: 2,
        segment: 'coa',
        fullPath: '/finance/coa',
        component: () =>
          import('../chart-of-accounts/account-template/ui/account-template-grid'),
        shortDescription: 'Account Template',
        longDescription: 'Account Template',
        showInNavigation: true,
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

      fn3: {
        routeId: 'fn3',
        parentId: 'fnl',
        lineItemId: 4,
        segment: 'new',
        fullPath: '/finance/ledger/new',
        component: () => import('../ui/LedgerCreateForm'),
        shortDescription: 'Create Ledger',
        longDescription: 'Allows user to create new ledger entries.',
        showInNavigation: false,
      },

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
    routesbyPath: {},
    navigation: {},
  },
};

export default financeModule;
