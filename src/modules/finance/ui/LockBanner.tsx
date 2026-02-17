'use client';

import { Alert } from '@mui/material';

export default function LockBanner({ locked }: { locked: boolean }) {
  if (!locked) return null;
  return (
    <Alert security="warning" sx={{ mb: 2 }}>
      This Accounting period is locked. Posting is disabled
    </Alert>
  );
}
