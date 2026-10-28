'use client';
import { Stack, Typography, TextField, MenuItem } from '@mui/material';
import MastersActionspace from '../masters-actionspace';
import ServerActionSubmit from '../master-form-header';
import tenatReducerAction from './command/action';
import { useActionState } from 'react';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TenantDTO, tenantDTO } from './command/zod_schema';
import TENANT from './schema';
import ControlledTextField from './controlled-text-field';

export default function TenantForm() {
  return (
    <MastersActionspace>
      <Form />
    </MastersActionspace>
  );
}

function Form() {
  const methods = useForm<TenantDTO>({
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={3} sx={{ ml: 4 }}>
          <Typography variant="h2">Tenant Creation</Typography>
          <ServerActionSubmit />
        </Stack>
        <Stack spacing={3} sx={{ mt: 3, ml: 5 }}>
          <ControlledTextField
            name="name"
            label="Name"
            helperText={TENANT.name.helpText}
            required={true}
          />
          <ControlledTextField
            name="code"
            label="Code"
            helperText={TENANT.name.helpText}
            required={true}
          />

          {/* <TextField
            variant="standard"
            label="Code"
            {...register('code')}
            error={!!errors.code}
            helperText={
              errors.code ? errors.code?.message : TENANT.code.helpText
            }
          />
          <TextField variant="standard" select label="Plan">
            {TENANT.plan.enum.value.map((v) => (
              <MenuItem>{v}</MenuItem>
            ))}
          </TextField>
          <TextField variant="standard" disabled required label="Users" />
          <TextField variant="standard" required label="Status" /> */}
        </Stack>
      </form>
    </FormProvider>
  );
}
