// Finance Shell Layout Component

import { Box } from '@mui/material';
import FinanceNav from './FinanceNav';
import FinanceContextBar from './FinanceContextBar';
import { ReactNode } from 'react';

export default function FinanceShell({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
      }}
    >
      {/* side bar */}
      <Box
        sx={{
          width: 220,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <FinanceNav />
      </Box>
      {/* Context */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <FinanceContextBar />
        <Box sx={{ p: 3, flex: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
