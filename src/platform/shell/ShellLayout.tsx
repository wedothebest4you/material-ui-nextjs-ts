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
import SearchIcon from '@mui/icons-material/Search';

import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import {
  Avatar,
  AvatarGroup,
  Collapse,
  ListItem,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import InfoIcon from '@mui/icons-material/Info';
import { SvgTextIcon } from '@/shared/client';
import { TemporaryDrawerButton } from '@/shared/client/index';
import { ResponsiveSearchBar } from '@/shared/client/index';
import { ColorSchemeSwitcher } from '@/shared/client/index';
import { PermanentDrawer } from '@/src/shared/client/index';
import NavDrawerContent from '../ui/nav-drawer-content';

const drawerWidth = 240;

// declare module '@mui/material/styles' {
//   interface ColorSchemeOverrides {
//     system: true;
//   }
// }

// const IconButtonStyled = styled(IconButton)<IconButtonOwnProps>({
//   fontFamily: '--font-Inter',
//   fontSize: '20px',
// } as IconButtonOwnProps);

export default function ShellLayout({
  children,
  // moduleList,
  // navigation,
}: {
  children: React.ReactNode;
  // moduleList: string[];
  // navigation: { [module: string]: Navigation };
}) {
  // const moduleList = ModuleRegistry.getModuleList();
  // const navigation = ModuleRegistry.getNavigation();
  // console.log('Component : PlatformShell');
  // console.log('Item : Module List');
  // console.log(moduleList);
  // console.log('Item : Navigation');
  // console.log(navigation);

  // console.log('Component : ShellLayout');
  // console.log('Item : Module List');
  // console.log(moduleList);
  // console.log('Item : Navigation');
  // console.log(navigation);
  // const [selectedModule, setSelectedModule] = React.useState(moduleList[0]);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          // color: 'text.primary',
          // bgcolor: 'transparent', //'background.paper',
          // zIndex: (theme) => theme.zIndex.appBar + 1,
          zIndex: 'calc(var(--mui-zIndex-drawer) + 1)',
        }}
      >
        <Toolbar
          variant="dense"
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TemporaryDrawerButton drawerContent={<></>} />
            <SvgTextIcon size="small" initials="erp" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flex: { xs: 0, md: 0.5 },
            }}
          >
            <ResponsiveSearchBar />
          </Box>
          {/* <IconButton size="large">
            <Typography variant="caption">erp</Typography>
          </IconButton> */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Tooltip title="Contextual information">
              <IconButton>
                <InfoIcon aria-hidden="true" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={1}
                  color="secondary"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <NotificationsSharpIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <IconButton sx={{ typography: 'caption' }}>
                <SvgTextIcon size="small" initials="PR"></SvgTextIcon>
              </IconButton>
              <IconButton size="small" sx={{ typography: 'caption' }}>
                <SvgTextIcon size="small" initials="CS"></SvgTextIcon>
              </IconButton>
              <IconButton size="small" sx={{ typography: 'caption' }}>
                <SvgTextIcon size="small" initials="TN"></SvgTextIcon>
              </IconButton>
              <IconButton size="small" sx={{ typography: 'caption' }}>
                <SvgTextIcon size="small" initials="UR"></SvgTextIcon>
              </IconButton>
            </Box>

            <ColorSchemeSwitcher />
            <Tooltip title="more options">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        {/* <Toolbar
          variant="dense"
          disableGutters
          sx={{
            display: mobileSearchMode ? 'flex' : 'none',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
        </Toolbar> */}
      </AppBar>

      <PermanentDrawer drawerContent={<NavDrawerContent />} />
      <Box>{children}</Box>
    </Box>
  );
}

// function ParentChildUnit({
//   navigation,
//   depth = 0,
// }: {
//   navigation: { [module: string]: Navigation };
//   depth?: number;
// }) {
//   const [modules, setModule] = useState<{
//     [module: string]: { open: boolean };
//   }>({});
//   console.log(modules);
//   return Object.entries(navigation).map(([module, navigation]) => (
//     <>
//       <ListItemButton
//         onClick={() =>
//           setModule({
//             ...modules,
//             [module]: { open: !modules[module]?.open },
//           })
//         }
//       >
//         <ListItemText>
//           {/* {ModuleRegistry.getModuleInfo()[module]?.moduleDisplayName} */}
//         </ListItemText>
//       </ListItemButton>
//       <Collapse in={modules[module]?.open}>
//         {Object.entries(navigation).map(([RouteKind, routeInfo]) => (
//           <ListItemButton component={Link} href={routeInfo.fullPath}>
//             <ListItemText>{routeInfo.longDescription}</ListItemText>
//           </ListItemButton>
//         ))}
//       </Collapse>
//     </>
//   ));
// }

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
