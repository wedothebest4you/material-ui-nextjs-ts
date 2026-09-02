import RoutesRegistry from '../services/routes-registry';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { ReactElement } from 'react';

// find out the first level parent nodes

// print each parent node
export default function NavDrawerContent() {
  let listContent: Array<ReactElement> = [];
  const erpModules = RoutesRegistry['erp'].toplevelnav;
  erpModules.children.forEach((moduleId) => {
    // console.log(erpModules.description);
    const moduleTopLvlRoutes = RoutesRegistry[moduleId].toplevelnav;
    // modules are always expanded, so no collapse composer here
    listContent.push(
      <ListItemButton>
        <ListItemText>{moduleTopLvlRoutes.description}</ListItemText>,
      </ListItemButton>,
    );

    moduleTopLvlRoutes.children.forEach((routeId) => {
      listContent.push(
        <Collapse in={true}>
          <RouteAndSubroute
            key={moduleId + routeId}
            moduleId={moduleId}
            routeId={routeId}
          />
        </Collapse>,
      );
    });
  });
  return (
    <List subheader={erpModules.description} dense>
      {listContent}
    </List>
  );
}

function RouteAndSubroute({
  moduleId,
  routeId,
}: {
  moduleId: string;
  routeId: string;
}) {
  // Logic : Print the given node with its childen.
  // Note : if any of the child has own children, then call this
  // code recursively treating that child as parent
  let listContent: Array<ReactElement> = [];
  const value = RoutesRegistry[moduleId][routeId];
  // console.log(RouteReg.getModuleRegistry()[key]);
  // console.log(value);

  if (Array.isArray(value.children)) {
    value.children.map((child) => {
      if (Array.isArray(RoutesRegistry[moduleId][child].children)) {
        listContent.push(
          <RouteAndSubroute
            key={moduleId + child}
            moduleId={moduleId}
            routeId={child}
          />,
        );
      } else {
        // console.log(
        //   moduleId,
        //   ':',
        //   value.description,
        //   ':',
        //   RoutesRegistry[moduleId][child].description,
        //);́
        listContent.push(
          <ListItemButton>
            <ListItemText>
              {RoutesRegistry[moduleId][child].description}
            </ListItemText>
          </ListItemButton>,
        );
      }
    });
  }
  /*
 each node expanded here are already under the respective modules
 therefore there is an outer collapse. And each node resulted by expansion
 is also to be composed under the respective nodes, therefore the resulted
 nodes are composed under a collapse here.
 */
  return (
    <Collapse in={true}>
      <List sx={{ pl: 1 }}>
        <ListItemButton>
          <ListItemText>{value.description}</ListItemText>,
        </ListItemButton>
        <Collapse in={true}>
          <List sx={{ pl: 1 }}>{listContent}</List>
        </Collapse>
      </List>
    </Collapse>
  );
}
