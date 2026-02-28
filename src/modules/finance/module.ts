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

import { ModuleDefinition } from '@/shared/types/index';
import { LedgerListForm } from '.';
import { LedgerCreateForm } from '.';
import { LedgerEditDialog } from '.';

export const financeModule: ModuleDefinition = {
  namespace: 'finance',

  routes: [
    {
      segment: 'ledger',
      shortDescription: 'Ledger',
      longDescription: 'Ledger management module.',
      showInNavigation: true,

      children: [
        {
          segment: '',
          component: LedgerListForm,
          shortDescription: 'View Ledger',
          longDescription: 'Allows user to browse ledger records.',
          showInNavigation: false,
        },

        {
          segment: 'new',
          component: LedgerCreateForm,
          shortDescription: 'Create Ledger',
          longDescription: 'Allows user to create new ledger entries.',
          showInNavigation: false,
        },

        {
          segment: ':id',
          component: LedgerEditDialog,
          shortDescription: 'Edit Ledger',
          longDescription: 'Allows user to edit ledger entries.',
          showInNavigation: false,
        },
      ],
    },
  ],
};
