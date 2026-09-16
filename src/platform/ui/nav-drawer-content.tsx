import RoutesRegistry from '../services/routes-registry';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { Fragment, useState } from 'react';
import ListItemComposer from './list-item-composer';
import Link from 'next/link';

// find out the first level parent nodes

// print each parent node
export default function NavDrawerContent() {
  console.log('NavDrawerContent');
  // Which shape of data would be in the variable erpModules ?
  // the variable erpModules will be a single object as shown in the below
  // sample. furthermore, it is the root object of route registry.
  // it stores the list of all modules in the erp system.
  // Sample :
  // {
  //   description: 'erp all',
  //   children: ['finance', 'platformadm'],
  // },
  // for more, refer to routes-registry.ts:

  const erpModules = RoutesRegistry['erp'].toplevelnav;

  // Which shape of data will be in the variable moduleTopLvlRoutes ?
  // the variable moduleTopLvlRoutes will be an array of
  // objects of top level navigators in each module.
  // Furthermore, each module will have its own top level navigators.
  // Below is an instance of moduleTopLvlRoutes,
  // it shows the two top level navigators, one for finance and the other for
  // platfrom admm module.
  // Sample :
  // [
  //   {
  //     moduleId : 'finance',
  //     description: 'Finance',
  //     children: ['dashboards', 'masters'],
  //   },
  //   {
  //     moduleId : 'platformadmn',
  //     description: 'Platform Admin',
  //     children: ['dashboards', 'masters'],
  //    },
  // ]
  // for more, refer to financeMdule.ts and module.ts

  const moduleTopLvlRoutes = erpModules.children.map((moduleId) => ({
    moduleId,
    ...RoutesRegistry[moduleId].toplevelnav,
  }));

  const listContent = moduleTopLvlRoutes.map(
    ({ moduleId, description, children }) => (
      <ListItemComposer description={description} key={moduleId}>
        <List sx={{ pl: 1 }}>
          {children.map((routeId) => (
            <RouteAndSubroutes
              key={moduleId + routeId}
              moduleId={moduleId}
              routeId={routeId}
            />
          ))}
        </List>
      </ListItemComposer>
    ),
  );
  return (
    <List subheader={erpModules.description} dense>
      {listContent}
    </List>
  );
}

function RouteAndSubroutes({
  moduleId,
  routeId,
}: {
  moduleId: string;
  routeId: string;
}) {
  // Logic : Print the given node with its childen.
  // Note : if any of the child has own children, then call this
  // code recursively treating that child as parent

  // let us say we have the following test data:
  // {
  //   finance: {
  //     toplevelnav: {
  //       description: 'Finance',
  //       children: ['dashboards', 'masters'],
  //     },
  //     dashboards: {
  //       description: 'Dashboards',
  //       children: ['4'],
  //     },
  //     masters: {
  //       description: 'Masters',
  //       children: ['acctemplate', '5'],
  //     },
  //     acctemplate: {
  //       description: 'Account Template',
  //       children: ['1', '2', '3'],
  //     },
  //     4: {
  //       description: 'Overview - dashboard',
  //       fullPath: '/finance',
  //       component: () => import('../ui/dashboard'),
  //     },
  //     1: {
  //       description: 'Account Template - Create',
  //       fullPath: '/finance/coa',
  //       component: () =>
  //         import('../chart-of-accounts/account-template/ui/account-template-grid'),
  //     },
  //     2: {
  //       description: 'Account Template - Edit',
  //       fullPath: '/finance/coa',
  //       component: () =>
  //         import('../chart-of-accounts/account-template/ui/account-template-grid'),
  //     },
  //     3: {
  //       description: 'Account Template - Delete',
  //       fullPath: '/finance/coa',
  //       component: () =>
  //         import('../chart-of-accounts/account-template/ui/account-template-grid'),
  //     },
  //     5: {
  //       description: 'Create Ledger',
  //       fullPath: '/finance/ledger/new',
  //       component: () => import('../ui/LedgerCreateForm'),
  //     },
  //   },
  // };
  //
  // eg. simple case
  // This function has been invoked with the args - module : finance, route: dashboards.
  // The dashboards route has children or sub routes. Therefore, the map method will
  // invoke. No child of dashboards has no more children.
  // Therefore the nested declaration will be SKIPPED, and the route
  // Overview - dashboard will be found as its only one list content.
  // This will result the following JSX when this function will return.
  // <Collapse>
  //   <List>
  //     <ListItemButton>
  //       <ListItemText>Dashboards</ListItemText>
  //     </ListItemButton>
  //     <Collapse>
  //       <List>
  //         <ListItemButton>
  //           <ListItemText>Overview - dashboard</ListItemText>
  //         </ListItemButton>
  //       </List>
  //     </Collapse>
  //   </List>
  // </Collapse>;
  //
  // eg. recursive case
  // module : finance, route : masters.
  // The first call to this function, will see masters route
  // has children or sub routes as 'acctemplate' and '5', therefore, the map method will
  // invoke. The child 'acctemplate' has FUTHER CHILDREN,
  // therefore the nested declaration will be invoked with 'acctemplate' as the route.
  // Please note, in this nested call, the route is 'acctemplate'. And it has children '1','2' and '3'.
  // However, non of these child has FURTHER CHILDREN. Therefore, there is no more nested calls.
  // instead each child will be mapped to the respective JSX.
  // This will result an array of the following JSX.
  // [
  //  <ListItemButton><LiteItemText>AccountTemplate - Create</LiteItemText></ListItemButton>,
  //  <ListItemButton><LiteItemText>AccountTemplate - Edit</LiteItemText></ListItemButton>,
  //  <ListItemButton><LiteItemText>AccountTemplate - Delete</LiteItemText></ListItemButton>,
  // ]
  // when the call will return, the final JSX will be the following.
  // <Collapse>
  //   <List>
  //     <ListItemButton>
  //       <ListItemText>Account Template</ListItemText>
  //     </ListItemButton>
  //     <Collapse>
  //       <List>
  //         <ListItemButton>
  //           <ListItemButton>
  //             <ListItemText>AccountTemplate - Create</ListeItemText>
  //           </ListItemButton>
  //           ,
  //           <ListItemButton>
  //             <ListItemText>AccountTemplate - Edit</ListeItemText>
  //           </ListItemButton>
  //           ,
  //           <ListItemButton>
  //             <ListItemText>AccountTemplate - Delete</ListeItemText>
  //           </ListItemButton>
  //           ,
  //         </ListItemButton>
  //       </List>
  //     </Collapse>
  //   </List>
  // </Collapse>;
  //
  // BUT the story of masters is not over, it has one more child as '5'.
  // However this has no futher children, therefore no more nested declaration.
  // So the JSX for this child alone will be the following.
  //  <ListItemButton>
  //    <ListItemText>Create Ledger</ListItemText>
  //  </ListItemButton>
  // Now the whole JSX for the main route 'masters' will include the jsx of the two child routes.
  // Therefore, the final JSX for the route masters will be the following.
  // <Collapse>
  //   <List>
  //     <ListItemButton>
  //       <ListItemText>Masters</ListItemText>
  //     </ListItemButton>
  //     <Collapse>
  //       <List>
  //         // the merged JSX of 'acctemplate' and '5' will come here
  //         // for brevity, it has been not reproduced here.
  //       </List>
  //     </Collapse>
  //   </List>
  // </Collapse>;

  const value = RoutesRegistry[moduleId][routeId];

  // console.log(RouteReg.getModuleRegistry()[key]);
  // console.log(value);
  if ((value.kind = 'group')) {
    const listContent = value.children.map((child) =>
      Array.isArray(RoutesRegistry[moduleId][child].children) ? (
        <RouteAndSubroutes
          key={moduleId + child}
          moduleId={moduleId}
          routeId={child}
        />
      ) : (
        <ListItemButton
          key={moduleId + child}
          LinkComponent={Link}
          href={RoutesRegistry[moduleId][child].routePath}
        >
          <ListItemText>
            {RoutesRegistry[moduleId][child].description}
          </ListItemText>
        </ListItemButton>
      ),
    );
  }

  /*
 each node expanded here are already under the respective modules
 therefore there is an outer collapse. And each node resulted by expansion
 is also to be composed under the respective nodes, therefore the resulted
 nodes are composed under a collapse here.
 */
  return (
    // <Collapse in={true}>
    //   <List sx={{ pl: 1 }}>
    //     <ListItemButton>
    //       <ListItemText>{value.description}</ListItemText>,
    //     </ListItemButton>
    //     <Collapse in={true}>
    //       <List sx={{ pl: 1 }}>{listContent}</List>
    //     </Collapse>
    //   </List>
    // </Collapse>
    <ListItemComposer description={value.description}>
      <List sx={{ pl: 1 }}>{listContent}</List>
    </ListItemComposer>
  );
}
