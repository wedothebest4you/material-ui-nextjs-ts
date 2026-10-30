'use client';
import { Stack, Typography, TextField, MenuItem } from '@mui/material';
import MastersActionspace from '../masters-actionspace';
import ServerActionSubmit from '../master-form-header';
import tenatReducerAction from './command/action';
import { useActionState } from 'react';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TenantDTO, tenantDTO } from './command/zod_schema';
import TENANT, { planEum } from './schema';
import StdTextField from './controlled_std_text_field';
import StdTextFieldSelect from './controlled_std_text_field_select';

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
      status: TENANT.status.enum.value[0],
    },
    resolver: zodResolver(tenantDTO),
    mode: 'onBlur',
    shouldFocusError: true,
  });
  console.log(methods);
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
          <StdTextField
            name="name"
            label="Name"
            helperText={TENANT.name.helpText}
            required
          />
          <StdTextField
            name="code"
            label="Code"
            helperText={TENANT.name.helpText}
            required
          />
          <StdTextFieldSelect
            name="plan"
            label="Plan"
            options={planEum}
            required
            onChange={(event) => {
              const index = TENANT.plan.enum.value.findIndex(
                (i) => i.description === event.target.value,
              );
              methods.setValue('userLimit', TENANT.userLimit.enum.value[index]);
            }}
          ></StdTextFieldSelect>
          <StdTextField name="userLimit" label="Users" disabled />
          <StdTextFieldSelect
            name="status"
            label="Status"
            options={TENANT.status.enum.value}
            required
            defaultValue="Active"
          ></StdTextFieldSelect>
        </Stack>
      </form>
    </FormProvider>
  );
}
