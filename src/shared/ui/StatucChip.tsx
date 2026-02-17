'use client';

import { Chip } from '@mui/material';

const colorMap: Record<string, any> = {
  OPEN: 'default',
  POSTED: 'success',
  PAID: 'success',
  DRAFT: 'warning',
  LOCKED: 'error',
};

export default function StatusChip({ status }: { status: string }) {
  return (
    <Chip size="small" label={status} color={colorMap[status] ?? 'default'} />
  );
}
