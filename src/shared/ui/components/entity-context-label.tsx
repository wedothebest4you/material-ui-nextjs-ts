'use client';

import { Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function EntityContextLabel() {
  const pathName = usePathname();

  return <Typography>{pathName}</Typography>;
}
