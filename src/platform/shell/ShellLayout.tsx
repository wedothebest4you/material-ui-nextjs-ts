/**
 * PLATFORM UI SHELL
 *
 * Responsibility:
 * Renders ERP layout frame:
 * - AppBar
 * - Navigation drawer
 * - Content area
 *
 * Architectural role:
 * Platform Presentation Layer (Client Component)
 *
 * Rules:
 * - Must NOT perform orchestration
 * - Must NOT access database
 * - Must NOT register modules
 */

'use client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import ModuleRegistry from '../services/ModuleRegistry';

const drawerWidth = 240;

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const modules = ModuleRegistry.getModuleRegistry();
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6">ERP Platform</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            mt: 8,
          },
        }}
      >
        <List>
          <Link
            key={'finance'}
            href={'finance'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemButton>
              <ListItemText primary={'fiknance'} />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
