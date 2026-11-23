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
import { Label } from '@mui/icons-material';
import { error } from 'node:console';

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
          {state.status === 'success' && (
            <Typography variant="subtitle1" color="primary">
              Data saved successfully.
            </Typography>
          )}

          {state.status == 'error' && (state.message || state.kind) && (
            <>
              <Typography variant="subtitle1" color="error">
                {state.kind}
              </Typography>
              <Typography variant="subtitle2" color="error">
                {state.message}
              </Typography>
            </>
          )}
          <StdTextField
            name="name"
            label={TENANT.name.label}
            helperText={TENANT.name.helpText}
            required
          />
          <StdTextField
            name="code"
            label={TENANT.code.label}
            helperText={TENANT.name.helpText}
            required
          />
          <StdTextFieldSelect
            name="plan"
            label={TENANT.plan.label}
            options={{
              data: plan,
              labels: planEnumLabels,
            }}
            required
            onChange={(event) => {
              const index = plan.findIndex(
                (i) => i.value === event.target.value,
              );
              // methods.setValue('userLimit', TENANT.userLimit.enum.value[index]);
              methods.setValue('userLimit', plan[index].userLimit);
            }}
          ></StdTextFieldSelect>
          <StdTextField
            name="userLimit"
            label={TENANT.userLimit.label}
            disabled
          />
          <StdTextFieldSelect
            name="status"
            label={TENANT.status.label}
            options={TENANT.status.enum.value}
            required
            defaultValue="Active"
          ></StdTextFieldSelect>
        </Stack>
      </form>
    </FormProvider>
  );
}
