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
} from '@mui/material';

interface TemplateFormProps {
  open: boolean;
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export default function TemplateForm({
  open,
  initialData,
  onClose,
  onSubmit,
}: TemplateFormProps) {
  const [form, setForm] = useState({
    code: '',
    name: '',
    type: '',
    parentId: '',
    isGroup: false,
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        code: initialData.code || '',
        name: initialData.name || '',
        type: initialData.type || '',
        parentId: initialData.parentId || '',
        isGroup: initialData.isGroup || false,
      });
    } else {
      setForm({
        code: '',
        name: '',
        type: '',
        parentId: '',
        isGroup: false,
      });
    }

    setErrors({});
  }, [initialData]);

  function validate() {
    const newErrors: any = {};

    if (!form.code.trim()) newErrors.code = 'Code is required';

    if (!form.name.trim()) newErrors.name = 'Name is required';
    // console.log('form.type.trim()', form);
    // //    if (!form.type.trim()) newErrors.type = 'Type is required';
    if (!form.type.trim()) newErrors.type = 'Type is required';

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
          <Grid item xs={12}>
            <TextField
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
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Parent Id"
              name="parentId"
              value={form.parentId}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.isGroup}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isGroup: e.target.checked,
                    })
                  }
                />
              }
              label="Is Group Account"
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
