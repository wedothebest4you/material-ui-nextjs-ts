//A flattened Javascript dictionary (object) stores hierarchical data

// export type RouteNode = {
//   children?: string[];
//   routeId: string;
//   parentId: string | null;
//   lineItemId: number;
//   segment: string;
//   fullPath: string;

//   component?: () => Promise<{ default: any }>;

//   shortDescription: string;
//   longDescription: string;

//   showInNavigation: boolean;
//   navigationLevel?: number;
// };

export type RouteNode =
  | {
      description: string;
      children: string[];
      fullpath?: undefined;
      component?: undefined;
      // parentId: string | null;
      // lineItemId: number;
      // segment: string;

      // showInNavigation: boolean;
      // navigationLevel?: number;
    }
  | {
      description: string;
      children?: undefined;
      fullPath: string;
      component: () => Promise<{ default: any }>;
      // parentId: string | null;
      // lineItemId: number;
      // segment: string;

      // showInNavigation: boolean;
      // navigationLevel?: number;
    };

export type RouteDictionarybyRouteId = {
  toplevelnav: { description: string; children: string[] };
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

// export type ModuleDefinition = {
//   [namespace: string]: {
//     routesbyId: RouteDictionarybyRouteId;
//     routesbyPath: RouteDictionarybyFullPath;
//     navigation: Navigation;
//   };
// };
export type ModuleDefinition = {
  [module: string]: RouteDictionarybyRouteId;
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

  enum?: ReadonlyArray<unknown>;

  oneOf?: AppJSONSchemaNode[];

  anyOf?: AppJSONSchemaNode[];

  allOf?: AppJSONSchemaNode[];
};

export interface AppJSONSchema extends AppJSONSchemaNode {
  bsonType: 'object';
  title: string;
}

// Shape of the state managed by the hook
export type ActionState = {
  success: boolean;
  message: string | undefined;
  errors?: Record<string, string>;
};

import { type SortOrder } from 'mongoose';

type SortOrderDocument<T> = Partial<Record<keyof T, SortOrder>>;
