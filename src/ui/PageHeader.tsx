'use cleint';

import { Box, Typography } from '@mui/material';

export default function PageHeader({
  title,
  subTitle,
  actions,
}: {
  title: string;
  subTitle: string;
  actions: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subTitle}
        </Typography>
      </Box>
      <Box>{actions}</Box>
    </Box>
  );
}
