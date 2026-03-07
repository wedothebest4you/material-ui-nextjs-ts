import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Stack,
} from '@mui/material';

import { deleteLedgerAction } from '../../server/ledger.actions';
import LedgerEditDialog from '../LedgerEditDialog';

interface Props {
  ledgers: any[];
}

export function LedgerTable({ ledgers }: Props) {
  debugger;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ledgers.map((ledger) => {
            const ledgerStrId = { ...ledger, _id: ledger._id.toString() };
            return (
              <TableRow key={ledgerStrId._id}>
                <TableCell>{ledgerStrId.name}</TableCell>

                <TableCell>{ledgerStrId.code}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {<LedgerEditDialog ledger={{ ...ledgerStrId }} />}

                    <form action={deleteLedgerAction}>
                      <input type="hidden" name="id" value={ledgerStrId._id} />

                      <Button type="submit" color="error">
                        Delete
                      </Button>
                    </form>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
