/**
 * LEDGER CREATE PAGE ROUTE ADAPTER
 *
 * Responsibility:
 * Mounts LedgerCreatePage into routing tree.
 *
 * Architectural role:
 * App Route Layer → Module Route Layer adapter
 *
 * Maintains clean separation between App and module internals.
 */

import { LedgerCreatePage } from '@/modules/finance/routes';

export default function Page() {
  return <LedgerCreatePage />;
}
