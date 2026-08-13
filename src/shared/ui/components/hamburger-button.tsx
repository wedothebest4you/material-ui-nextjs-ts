'use client';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

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
    </>
  );
}
