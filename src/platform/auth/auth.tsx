//Org + permission context (server-only)

import { cache } from 'react';

export type Permission =
  | 'VIEW_DASHBOARD'
  | 'VIEW_GL'
  | 'VIEW_JOURNALS'
  | 'POST_JOURNAL'
  | 'VIEW_INVOICES'
  | 'EDIT_INVOICE'
  | 'APPLY_PAYMENT'
  | 'VIEW_REPORTS';

export type AuthContext = {
  userId: string;
  orgId: string;
  permissions: Permission[];
  orgName: string;
};

export const getAuthContext = cache(async (): Promise<AuthContext> => {
  return {
    // 🔐 Replace with real auth (Clerk / NextAuth / custom)
    userId: 'demo-user',
    orgId: 'demo-org',
    orgName: 'Demo Corporation',
    permissions: [
      'VIEW_DASHBOARD',
      'VIEW_GL',
      'VIEW_JOURNALS',
      'POST_JOURNAL',
      'VIEW_INVOICES',
      'EDIT_INVOICE',
      'APPLY_PAYMENT',
      'VIEW_REPORTS',
    ],
  };
});
