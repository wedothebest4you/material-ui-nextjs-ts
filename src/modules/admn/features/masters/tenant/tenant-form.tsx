'use client';
import { Stack, Typography, TextField, standardInput } from '@mui/material';
import MastersActionspace from '../masters-actionspace';
import ServerActionSubmit from '../master-form-header';
import tenatReducerAction from './command/action';
import { useActionState } from 'react';

export default function TenantForm() {
  return (
    <MastersActionspace>
      <Form />
    </MastersActionspace>
  );
}

function Form() {
  const [state, dispacthAction, isPending] = useActionState(
    tenatReducerAction,
    { success: undefined, message: undefined },
  );
  return (
    <form>
      <Stack direction="row" spacing={3} sx={{ ml: 4 }}>
        <Typography variant="h2">Tenant Creation</Typography>
        <ServerActionSubmit />
      </Stack>
      <Stack spacing={3} sx={{ mt: 3, ml: 5 }}>
        <TextField variant="standard" required label="Name" />
        <TextField variant="standard" required label="Code" />
        <TextField variant="standard" required label="Plan" />
        <TextField variant="standard" disabled required label="Users" />
        <TextField variant="standard" required label="Status" />
      </Stack>
    </form>
  );
}
