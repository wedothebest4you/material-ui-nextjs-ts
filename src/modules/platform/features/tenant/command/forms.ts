'use client';

import { useActionState } from 'react';
import { createTenantAction } from './action';
import { ActionState } from '@/src/shared';

import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';

const initialState: ActionState = { success: false, message: undefined };

export function CreateForm() {
  const [state, formAction, isPending] = useActionState(
    createTenantAction,
    initialState,
  );
  return 'Create a new Tenant';
}
