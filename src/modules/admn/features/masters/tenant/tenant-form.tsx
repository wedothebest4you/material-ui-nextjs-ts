'use client';
import { Stack, Typography, TextField } from '@mui/material';
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
        <TextField required label="Name" />
        <TextField required label="Code" />
        <TextField required label="Plan" />
        <TextField required label="Users" />
        <TextField required label="Status" />
      </Stack>
    </form>
  );
}
