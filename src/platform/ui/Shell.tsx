// The Shell composes AppBar + Navigation + Content. It does not know what is rendered, only where.

'use client';

import { Box } from '@mui/material';
import Nav from './Nav';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Nav />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}
      >
        {children}
      </Box>
    </Box>
  );
}
