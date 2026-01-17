'use client';
import { useTheme } from '@mui/material/styles';

export function LogTheme() {
  const theme = useTheme();
  console.log(theme.typography.h1);
  console.log(theme.breakpoints.values);
  return <></>;
}
