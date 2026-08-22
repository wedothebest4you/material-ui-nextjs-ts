'use client';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';

export default function HamburgerButton() {
  const [sidebar, setSidebar] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

  const menuStatus = menuExpanded
    ? 'Collapse'
    : 'Expand' + ' '.repeat(1) + 'sidebar, the navigational menu';

  return (
    <>
      <Tooltip title={menuStatus}>
        <IconButton onClick={() => setSidebar(!sidebar)}>
          <MenuIcon></MenuIcon>
        </IconButton>
      </Tooltip>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: sidebar ? 'block' : 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: { md: '30%', lg: '35%' } },
        }}
      >
        <List>
          {/* <ParentChildUnit navigation={navigation}></ParentChildUnit> */}
          List1
        </List>
      </Drawer>
    </>
  );
}
