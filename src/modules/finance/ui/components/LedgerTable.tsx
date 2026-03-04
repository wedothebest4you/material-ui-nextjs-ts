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
          {/* {ledgers.map((ledger: any) => {
            debugger;
            return (
              <TableRow key={ledger._id}>
                <TableCell>{ledger.name}</TableCell>

                <TableCell>{ledger.code}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <LedgerEditDialog ledger={ledger} />

                    <form action={deleteLedgerAction}>
                      <input type="hidden" name="id" value={ledger._id} />

                      <Button type="submit" color="error">
                        Delete
                      </Button>
                    </form>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
