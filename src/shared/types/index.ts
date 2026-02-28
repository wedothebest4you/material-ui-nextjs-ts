export type RouteNode = {
  segment: string;

  component?: React.ComponentType;

  shortDescription: string;
  longDescription: string;

  showInNavigation: boolean;

  children?: RouteNode[];
};

export type ModuleDefinition = {
  namespace: string;
  routes: RouteNode[];
};
