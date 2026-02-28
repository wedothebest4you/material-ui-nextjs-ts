/**
 * LEDGER LIST UI
 *
 * Responsibility:
 * Displays ledger list screen UI.
 *
 * Architectural role:
 * Module Presentation Layer
 */

import { listLedgersAction } from '../server/ledger.actions';
import { LedgerTable } from './components/LedgerTable';
import LedgerCreateForm from './LedgerCreateForm';
import { Box, Typography } from '@mui/material';

export default async function LedgerListPage() {
  const ledgers = await listLedgersAction();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Ledger
      </Typography>

      <LedgerCreateForm />

      <LedgerTable ledgers={ledgers} />
    </Box>
  );
}
