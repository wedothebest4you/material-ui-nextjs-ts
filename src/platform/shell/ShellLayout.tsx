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

import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { RouteNode } from '@/shared/types';
import { Navigation } from '@/shared/types';

const drawerWidth = 240;

export default function ShellLayout({
  children,
  moduleList,
  navigation,
}: {
  children: React.ReactNode;
  moduleList: string[];
  navigation: { [module: string]: Navigation };
}) {
  console.log('Component : ShellLayout');
  console.log('Item : Module List');
  console.log(moduleList);
  console.log('Item : Navigation');
  console.log(navigation);
  const [selectedModule, setSelectedModule] = React.useState(moduleList[0]);
  return (
    <Box sx={{ display: 'flex' }}>
      {/* APP BAR */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6">ERP Platform</Typography>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />

        {/* FLEX CONTAINER FOR TWO LISTS */}
        <Box sx={{ display: 'flex', height: '100%' }}>
          {/* FIRST LIST (MODULES) */}
          <Box sx={{ width: 120 }}>
            <List>
              {moduleList.map((module) => (
                <ListItemButton
                  key={module}
                  selected={module === selectedModule}
                  onClick={() => setSelectedModule(module)}
                >
                  <ListItemText primary={module} />
                </ListItemButton>
              ))}
            </List>
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* SECOND LIST (MODULE MENUS) */}
          <Box sx={{ flexGrow: 1 }}>
            <List>
              {Object.entries(navigation[selectedModule]).map(
                ([key, value]) => (
                  <ListItemButton
                    key={key}
                    component={Link}
                    href={value.fullPath}
                  >
                    <ListItemText primary={value.longDescription} />
                  </ListItemButton>
                ),
              )}
            </List>
          </Box>
        </Box>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Typography variant="h4">{selectedModule} Module</Typography>

        {children}
      </Box>
    </Box>
  );
}
