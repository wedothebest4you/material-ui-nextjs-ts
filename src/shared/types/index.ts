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

export type Navigation = {
  [routeId: string]: {
    longDescription: string;
    fullPath: string;
  };
};

export type ModuleDefinition = {
  [namespace: string]: {
    routesbyId: RouteDictionarybyRouteId;
    routesbyPath: RouteDictionarybyFullPath;
    navigation: Navigation;
  };
};

export interface IUser {
  email: string;

  isAdmin: boolean;

  grantedRoutes: {
    [namespace: string]: string[];
  };
}

type BsonType = 'object' | 'string' | 'objectId' | 'date' | 'null' | 'int';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AppJSONSchemaNode = {
  bsonType?: BsonType | BsonType[];
  properties: Record<string, Optional<AppJSONSchemaNode, 'properties'>>;
  description?: string;
  minimum?: number;
  maximum?: number;
  maxLength?: number;
  items?: AppJSONSchemaNode;

  required?: string[];

  enum?: unknown[];

  oneOf?: AppJSONSchemaNode[];

  anyOf?: AppJSONSchemaNode[];

  allOf?: AppJSONSchemaNode[];
};

export interface AppJSONSchema extends AppJSONSchemaNode {
  bsonType: 'object';
  title: string;
}
