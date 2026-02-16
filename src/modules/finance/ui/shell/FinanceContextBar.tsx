// Finance Context Bar

'use client';

import { Box, List, Typography } from '@mui/material';

export default function FinanceContextBar() {
  const orgName = 'DEV_ORG';
  const period = '2026-02';
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {orgName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {period}
      </Typography>
    </Box>
  );
}
