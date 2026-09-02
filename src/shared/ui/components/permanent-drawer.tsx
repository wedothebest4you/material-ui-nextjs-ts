import { Toolbar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useState, ReactNode } from 'react';

export default function PermanentDrawer({
  drawerContent,
}: {
  drawerContent: ReactNode;
}) {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: { md: '30%', lg: '35%' } },
        }}
      >
        <Toolbar variant="dense" />
        {drawerContent}
      </Drawer>
    </>
  );
}
