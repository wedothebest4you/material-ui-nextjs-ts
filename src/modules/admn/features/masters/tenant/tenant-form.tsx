'use client';
import { Stack, Typography, TextField, MenuItem } from '@mui/material';
import MastersActionspace from '../masters-actionspace';
import ServerActionSubmit from '../master-form-header';
import tenatReducerAction from './command/action';
import { startTransition, useActionState, useMemo } from 'react';
import {
  useForm,
  FormProvider,
  type SubmitHandler,
  FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TenantDTO, tenantDTO, TenantKeys } from './command/zod_schema';
import TENANT, { plan, planEnumLabels } from './schema';
import StdTextField from './controlled_std_text_field';
import StdTextFieldSelect from './controlled_std_text_field_select';
import { type ActionState } from '@/src/shared';

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
    { status: 'idle' },
  );

  const serverErrors = useMemo(() => {
    if (state.status !== 'error' || !state.fieldErrors) return undefined;
    const errors: FieldErrors<TenantDTO> = {};
    for (const [name, message] of Object.entries(state.fieldErrors)) {
      errors[name as TenantKeys] = { type: 'server', message };
    }
    return errors;
  }, [state]);

  const methods = useForm<TenantDTO>({
    defaultValues: {
      status: TENANT.status.enum.value[0],
    },
    // resolver: zodResolver(tenantDTO),
    mode: 'onBlur',
    shouldFocusError: true,
    errors: serverErrors,
  });
  const onSubmit: SubmitHandler<TenantDTO> = (data) =>
    startTransition(() => dispacthAction(data));

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
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
            options={{
              data: plan,
              labels: planEnumLabels,
            }}
            required
            onChange={(event) => {
              const index = plan.findIndex(
                (i) => i.value === event.target.value,
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
