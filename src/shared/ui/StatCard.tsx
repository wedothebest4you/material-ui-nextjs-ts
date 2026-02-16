'use client';

import { Paper, Typography } from '@mui/material';

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {value}
      </Typography>
    </Paper>
  );
}
