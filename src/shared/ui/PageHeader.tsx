'use client';

import { Box, Typography } from '@mui/material';

export default function PageHeader({
  title,
  subTitle,
  actions,
}: {
  title: string;
  subTitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <Box>
      <Box>
        <Typography variant="h5">{title}</Typography>
        {subTitle && <Typography variant="body2">{subTitle}</Typography>}
      </Box>
      {actions && <Box>{actions}</Box>}
    </Box>
  );
}
