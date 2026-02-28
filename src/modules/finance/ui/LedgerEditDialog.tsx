'use client';

/**
 * Ledger edit dialog.
 */

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';

import { useState } from 'react';
import { updateLedgerAction } from '../server/ledger.actions';

export default function LedgerEditDialog({ ledger }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Ledger</DialogTitle>

        <form action={updateLedgerAction}>
          <DialogContent>
            <input type="hidden" name="id" value={ledger._id} />

            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField name="name" label="Name" defaultValue={ledger.name} />

              <TextField name="code" label="Code" defaultValue={ledger.code} />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>

            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
