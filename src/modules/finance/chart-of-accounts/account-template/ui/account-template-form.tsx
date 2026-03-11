'use client';

import { Grid } from '@/shared/index';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  MenuItem,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  FormGroup,
  FormLabel,
  FormControl,
  Divider,
} from '@mui/material';
import {
  AccountTemplate,
  AccountTemplateDocument,
} from '../model/account-template';

type SelectedAccount =
  | AccountTemplateDocument
  | (Omit<AccountTemplateDocument, 'id'> & { id: 'new' });

interface TemplateFormProps {
  open: boolean;
  initialData: SelectedAccount;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export default function TemplateForm({
  open,
  initialData,
  onClose,
  onSubmit,
}: TemplateFormProps) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState<{
    code: string;
    name: string;
    type: string;
  } | null>();

  // useEffect(() => {
  //   if (initialData) {
  //     setForm({
  //       code: initialData.code || '',
  //       name: initialData.name || '',
  //       type: initialData.type || '',
  //       parentId: initialData.parentId || '',
  //       accType: initialData.accType || '',
  //     });
  //   } else {
  //     setForm({
  //       code: '',
  //       name: '',
  //       type: '',
  //       parentId: '',
  //       isGroup: false,
  //     });
  //   }

  //   setErrors({});
  // }, [initialData]);

  function validate() {
    const newErrors: any = {};

    if (!form.code.trim()) newErrors.code = 'Code is required';

    if (!form.name.trim()) newErrors.name = 'Name is required';
    // console.log('form.type.trim()', form);
    // //    if (!form.type.trim()) newErrors.type = 'Type is required';
    if (!form.accType.trim()) newErrors.type = 'Type is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;

    await onSubmit(form);
  }

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? 'Edit Account Template' : 'Create Account Template'}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <RadioGroup
              row
              value={form.accType}
              onChange={(e) =>
                setForm({
                  ...form,
                  accType: e.target.value as 'ledger' | 'group',
                })
              }
            >
              <FormControlLabel
                value={'ledger'}
                control={<Radio />}
                label="Ledger Account"
              />
              <FormControlLabel
                value={'group'}
                control={<Radio />}
                label="Group Account"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Group Account it belongs to"
              name="parentId"
              value={form.parentId}
              onChange={handleChange}
              fullWidth
              helperText="Group Account is mandatory for Ledger Accounts. Leaving it blank for Group Account will create the new Group Account as the new Root Group Account."
            />
          </Grid>
          <FormControl required error={!!errors.type} fullWidth>
            <FormLabel>Category of Ledger or Group</FormLabel>
            <FormHelperText>{errors.type}</FormHelperText>
            <RadioGroup
              row
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as
                    | 'asset'
                    | 'liability'
                    | 'equity'
                    | 'revenue'
                    | 'expense',
                })
              }
            >
              <FormControlLabel
                value="asset"
                control={<Radio />}
                label="Asset"
              />
              <FormControlLabel
                value="liability"
                control={<Radio />}
                label="Liability"
              />
              <FormControlLabel
                value="equity"
                control={<Radio />}
                label="Equity"
              />
              <FormControlLabel
                value="revevue"
                control={<Radio />}
                label="Revevue"
              />
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
            </RadioGroup>
          </FormControl>
          <Grid item xs={12}>
            {/* <TextField
              select
              label="Type"
              name="type"
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
              fullWidth
              required
              error={!!errors.type}
              helperText={errors.type}
            >
              <MenuItem value="asset">Asset</MenuItem>
              <MenuItem value="liability">Liability</MenuItem>
              <MenuItem value="equity">Equity</MenuItem>
              <MenuItem value="revenue">Revenue</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Code"
              name="code"
              value={form.code}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.code}
              helperText={errors.code}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
