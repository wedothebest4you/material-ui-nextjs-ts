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
import { IAccountTemplate, AccountTemplate } from '../model/account-template';

interface TemplateFormProps {
  open: boolean;
  selectedItem: IAccountTemplate | undefined;
  onClose: () => void;
  onSubmit: (data: IAccountTemplate) => Promise<IAccountTemplate>;
}

export default function TemplateForm({
  open,
  selectedItem,
  onClose,
  onSubmit,
}: TemplateFormProps) {
  let initialData = selectedItem;
  let dialogTitle = '';
  if (!selectedItem) {
    dialogTitle = 'Create Account Template';
    initialData = {
      id: '',
      name: '',
      code: '',
      category: '',
      parentId: undefined,
      path: '',
      level: 0,
      accType: '',
    };
  } else {
    dialogTitle = 'Edit Account Template';
    initialData = { ...selectedItem };
  }

  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({
    code: '',
    name: '',
    type: '',
  });
  //Debug
  console.log(TemplateForm.name);
  console.log('selectedItem');
  console.log(selectedItem);
  console.log('form');
  console.log(JSON.stringify(form));

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
    let code = '',
      name = '',
      type = '';

    if (!form.code.trim()) code = 'Code is required';

    if (!form.name.trim()) name = 'Name is required';
    // console.log('form.type.trim()', form);
    // //    if (!form.type.trim()) newErrors.type = 'Type is required';
    if (!form.accType.trim()) type = 'Type is required';

    setErrors({ code, name, type });

    return !(code || name || type);
  }

  async function handleSubmit() {
    if (!validate()) return;

    if (await onSubmit(form)) setForm({});
  }

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{dialogTitle}</DialogTitle>

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
              defaultValue=""
              value={form.parentId}
              onChange={handleChange}
              fullWidth
              helperText="Group Account is mandatory for Ledger Accounts. Leaving it blank for Group Account will create the new Group Account as the new Root Group Account."
            />
          </Grid>
          <FormControl required error={!!errors.type} fullWidth>
            <FormLabel>Category of Ledger or Group</FormLabel>
            <FormHelperText>{errors?.type}</FormHelperText>
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
                value="revenue"
                control={<Radio />}
                label="Revenue"
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
