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

import React, { useState, Dispatch, SetStateAction } from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import { Tooltip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { useColorScheme } from '@mui/material';

const drawerWidth = 240;

// declare module '@mui/material/styles' {
//   interface ColorSchemeOverrides {
//     system: true;
//   }
// }

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
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [selectedModule, setSelectedModule] = React.useState(moduleList[0]);
  const menuStatus = menuExpanded
    ? 'Collapse'
    : 'Expand' + ' '.repeat(1) + 'sidebar, the navigational menu';
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      {/* APP BAR */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          color: 'text.primary',
          bgcolor: 'transparent', //'background.paper',
          zIndex: 1,
        }}
      >
        <Toolbar variant="dense" disableGutters>
          <Box
            sx={{
              display: 'flex',
              m: { xs: 0.5, md: 1 },
            }}
          >
            <Tooltip title={menuStatus}>
              <IconButton
                aria-label={menuStatus}
                aria-expanded={menuExpanded!}
                size="small"
              >
                <MenuIcon fontSize="large"></MenuIcon>
              </IconButton>
            </Tooltip>
            {/* <Typography variant="overline">e.r.p</Typography>
            <Typography variant="caption">
              enterprise resource planner
            </Typography> */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 2,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="caption">Notifications</Typography>
            <TextField
              id="standard-search"
              variant="standard"
              type="search"
              label="Search"
              sx={{
                typography: 'caption',
              }}
              slotProps={{
                input: {
                  sx: {
                    typography: 'caption',
                  },
                },
                inputLabel: {
                  sx: {
                    typography: 'caption',
                  },
                },
                formHelperText: {
                  sx: {
                    typography: 'caption',
                  },
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 3,
              justifyContent: 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Typography sx={{ flex: 1 }} variant="caption">
                Tenant
              </Typography>
              <Typography sx={{ flex: 1 }} variant="caption">
                Company
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Typography sx={{ flex: 1 }} variant="caption">
                User
              </Typography>
              <Typography sx={{ flex: 1 }} variant="caption">
                Period
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flex: 0.25,
            }}
          >
            <ColorScheSwitcher />

            <Tooltip title="more options">
              <IconButton size="small" color="secondary">
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// DRAWER
// <Drawer variant="permanent">
//   <Toolbar />

//   {/* FLEX CONTAINER FOR TWO LISTS */}
//   <Box sx={{ display: 'flex', height: '100%' }}>
//     {/* FIRST LIST (MODULES) */}
//     <Box sx={{ width: 120 }}>
//       <List>
//         {moduleList.map((module) => (
//           <ListItemButton
//             key={module}
//             selected={module === selectedModule}
//             onClick={() => setSelectedModule(module)}
//           >
//             <ListItemText primary={module} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Box>

//     {/* SECOND LIST (MODULE MENUS) */}
//     <Box sx={{ flexGrow: 1 }}>
//       <List>
//         {Object.entries(navigation[selectedModule]).map(
//           ([key, value]) => (
//             <ListItemButton
//               key={key}
//               component={Link}
//               href={value.fullPath}
//             >
//               <ListItemText primary={value.longDescription} />
//             </ListItemButton>
//           ),
//         )}
//       </List>
//     </Box>
//   </Box>
// </Drawer>

// {/* Workspace host or MAIN CONTENT */}
// <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//   <Toolbar />

//   <Typography variant="h4">{selectedModule} Module</Typography>

//   {children}
// </Box>
function ColorScheSwitcher() {
  const { mode, setMode } = useColorScheme();
  // first render will have no colorSchem - both the SSR and CSR
  // performs an early return here.
  // the actual state will receive here once the special script updates the
  // browser store.
  if (!mode) {
    return;
  }
  const modes = {
    system: {
      icon: SettingsBrightness,
      next: 'light',
    },
    light: {
      icon: LightMode,
      next: 'dark',
    },
    dark: {
      icon: DarkMode,
      next: 'system',
    },
  } as const;

  const colorSchemeButtonCycles = () => {
    setMode(modes[mode].next);
  };

  const Icon = modes[mode].icon;
  const IconDisplay = <Icon fontSize="small" />;
  const colorSchemeStatus = `Color mode : ${mode} - click for ${modes[mode].next}`;

  return (
    <Tooltip title={colorSchemeStatus}>
      <IconButton onClick={colorSchemeButtonCycles}>{IconDisplay}</IconButton>
    </Tooltip>
  );
}
