import RoutesRegistry from '../services/routes-registry';

// find out the first level parent nodes

// print each parent node
export default function NavDrawerContent() {
  const erpModules = RoutesRegistry['erp'].toplevelnav;
  erpModules.children.forEach((moduleId) => {
    console.log(erpModules.description);
    const moduleTopLvlRoutes = RoutesRegistry[moduleId].toplevelnav;
    moduleTopLvlRoutes.children.forEach((routeId) => {
      ExpandNode(moduleId, routeId);
    });
  });

  // topLevelRoutes.forEach(route=>route.toplevelnav.children)
  return <></>;
}

function ExpandNode(moduleId: string, routeId: string) {
  // Logic : Print the given node with its childen.
  // Note : if any of the child has own children, then call this
  // code recursively treating that child as parent
  const value = RoutesRegistry[moduleId][routeId];
  // console.log(RouteReg.getModuleRegistry()[key]);
  // console.log(value);
  if (Array.isArray(value.children)) {
    value.children.map((child) => {
      if (Array.isArray(RoutesRegistry[moduleId][child].children)) {
        ExpandNode(moduleId, child);
      } else {
        console.log(
          moduleId,
          ':',
          value.description,
          ':',
          RoutesRegistry[moduleId][child].description,
        );
      }
    });
  }
  return <></>;
}
