/**
 * LEDGER PAGE ROUTE ADAPTER
 *
 * Responsibility:
 * Mounts the Finance module LedgerPage into the App Router.
 *
 * Architectural role:
 * App Route Layer → Module Route Layer adapter
 *
 * Rules:
 * - Must import ONLY from module routes
 * - Must NOT import module UI
 * - Must NOT import module services
 *
 * Ensures module isolation from App.
 */

import { LedgerPage } from '@/modules/finance/routes';

export default function Page() {
  return <LedgerPage />;
}
