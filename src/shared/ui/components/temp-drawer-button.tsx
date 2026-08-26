'use client';

import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, ReactElement } from 'react';
import { TemporaryDrawer } from '@/shared/client/index';

export default function TemporaryDrawerButton({
  drawerContent,
}: {
  drawerContent: ReactElement;
}) {
  const [toggle, setToggle] = useState(false);

  const menuStatus = 'show or hide '.repeat(1) + 'the drawer';

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <Tooltip title={menuStatus}>
        <IconButton onClick={() => setToggle(!toggle)}>
          <MenuIcon></MenuIcon>
        </IconButton>
      </Tooltip>
      <TemporaryDrawer
        toggle={toggle}
        setToggle={setToggle}
        drawerContent={drawerContent}
      />
    </Box>
  );
}
