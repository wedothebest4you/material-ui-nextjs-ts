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
  onSubmit: (data: any) => void;
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
  }, [initialData]);

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
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Type"
              fullWidth
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
            >
              <MenuItem value="asset">Asset</MenuItem>
              <MenuItem value="liability">Liability</MenuItem>
              <MenuItem value="equity">Equity</MenuItem>
              <MenuItem value="revenue">Revenue</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>{' '}
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
        <Button variant="contained" onClick={() => onSubmit(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
