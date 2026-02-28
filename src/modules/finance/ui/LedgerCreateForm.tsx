/**
 * LEDGER CREATE UI
 *
 * Responsibility:
 * Provides ledger creation form UI.
 *
 * Architectural role:
 * Module Presentation Layer
 */

'use client';

/**
 * Ledger creation form.
 */

import { createLedgerAction } from '../server/ledger.actions';
import { Box, Button, TextField, Paper, Stack } from '@mui/material';

export default function LedgerCreateForm() {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <form action={createLedgerAction}>
        <Stack direction="row" spacing={2}>
          <TextField name="name" label="Ledger Name" required />

          <TextField name="code" label="Code" required />

          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
