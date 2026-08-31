import { RouteNode } from '@/src/shared';
import RoutesRegistry from '../services/routes-registry';

// find out the first level parent nodes

// print each parent node
export default function NavDrawerContent() {
  const toplevelnav = Object.values(RoutesRegistry).filter(
    (nav) => nav.toplevelnav,
  );
  console.log(toplevelnav);

  return <></>;
}

// function ExpandNode(key: string, routes: RouteNode) {
//   // Logic : Print the given node with its childen.
//   // Note : if any of the child has own children, then call this
//   // code recursively treating that child as parent
//   const value = RouteReg.getModuleRegistry()[key].routesbyId;
//   // console.log(RouteReg.getModuleRegistry()[key]);
//   // console.log(value);
//   if (Array.isArray(value.children)) {
//     value.children.map((child) => {
//       if (
//         Array.isArray(RouteReg.getModuleRegistry()[child].routesbyId.children)
//       ) {
//         // ExpandNode(child);
//       } else {
//         // console.log(RouteReg.getModuleRegistry()[child].routesbyId);
//       }
//     });
//   }
//   return <></>;
// }
