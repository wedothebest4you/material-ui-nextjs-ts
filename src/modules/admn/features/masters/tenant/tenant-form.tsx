'use client';
import { Stack, Typography, TextField, MenuItem } from '@mui/material';
import MastersActionspace from '../masters-actionspace';
import ServerActionSubmit from '../master-form-header';
import tenatReducerAction from './command/action';
import { useActionState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TenantDTO, tenantDTO } from './command/zod_schema';
import TENANT from './schema';

export default function TenantForm() {
  return (
    <MastersActionspace>
      <Form />
    </MastersActionspace>
  );
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantDTO>({
    defaultValues: {
      status: 'active',
    },
    resolver: zodResolver(tenantDTO),
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const [state, dispacthAction, isPending] = useActionState(
    tenatReducerAction,
    { success: undefined, message: undefined },
  );
  const onSubmit: SubmitHandler<TenantDTO> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={3} sx={{ ml: 4 }}>
        <Typography variant="h2">Tenant Creation</Typography>
        <ServerActionSubmit />
      </Stack>
      <Stack spacing={3} sx={{ mt: 3, ml: 5 }}>
        <TextField
          variant="standard"
          label="Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name ? errors.name?.message : TENANT.name.helpText}
        />
        <TextField
          variant="standard"
          label="Code"
          {...register('code')}
          error={!!errors.code}
          helperText={errors.code ? errors.code?.message : TENANT.code.helpText}
        />
        <TextField variant="standard" select label="Plan">
          {TENANT.plan.enum.value.map((v) => (
            <MenuItem>{v}</MenuItem>
          ))}
        </TextField>
        <TextField variant="standard" disabled required label="Users" />
        <TextField variant="standard" required label="Status" />
      </Stack>
    </form>
  );
}
