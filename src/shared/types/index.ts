//A flattened Javascript dictionary (object) stores hierarchical data

export type RouteNode = {
  routeId: string;
  parentId: string | null;
  lineItemId: number;
  segment: string;
  fullPath: string;

  component?: () => Promise<{ default: React.ComponentType<any> }>;

  shortDescription: string;
  longDescription: string;

  showInNavigation: boolean;
};

export type RouteDictionarybyRouteId = {
  [routeId: string]: RouteNode;
};

export type RouteDictionarybyFullPath = {
  [fullPath: string]: RouteNode;
};

type ModuleNamespace = {
  [namespace: string]: string;
};

export type ModuleDefinition = {
  [namespace: string]: {
    routesbyId: RouteDictionarybyRouteId;
    routesbyPath: RouteDictionarybyFullPath;
    navigation: RouteDictionarybyRouteId;
  };
};

export interface IUser {
  email: string;

  isAdmin: boolean;

  grantedRoutes: string[];
}
