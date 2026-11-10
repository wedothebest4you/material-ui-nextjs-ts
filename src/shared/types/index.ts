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

type RouteGroup = {
  kind: 'group';
  description: string;
  children: string[];
};

type RouteItem = {
  kind: 'route';
  description: string;
  routePath: string;
  component: () => Promise<{ default: any }>;
};

export type RouteNode = RouteGroup | RouteItem;

export type RouteDictionarybyRouteId = {
  toplevelnav: RouteGroup;
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
// export type ActionState = {
//   success: boolean | undefined;
//   message: string | undefined;
//   errors?: Record<string, string>;
// };

export type ActionState<T extends string> =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error';
      message?: string;
      fieldErrors?: Partial<Record<T, string>>;
    };

import { type SortOrder } from 'mongoose';

type SortOrderDocument<T> = Partial<Record<keyof T, SortOrder>>;

export function IsStringReadArray(val: unknown): val is ReadonlyArray<String> {
  return Array.isArray(val) && val.every((item) => typeof item === 'string');
}

export function IsSelectOptionsRecord(val: unknown): val is Readonly<{
  data: ReadonlyArray<
    Record<'value', string> & Record<string, string | number>
  >;
  labels: ReadonlyArray<Record<string, string>>;
}> {
  if (
    !(
      typeof val == 'object' &&
      val !== null &&
      'data' in val &&
      'labels' in val
    )
  )
    return false;

  if (!(Array.isArray(val.data) && val.data.every((i) => 'value' in i)))
    return false;

  if (
    !val.data
      .map((i) =>
        Object.values(i).every(
          (i) => typeof i === 'string' || typeof i === 'number',
        ),
      )
      .every((i) => i)
  )
    return false;

  if (
    !(
      typeof val.labels === 'object' &&
      val.labels !== null &&
      Object.values(val.labels).every(
        (i) => typeof i == 'object' && typeof i !== null,
      )
    )
  )
    return false;

  if (
    !Object.values(val.labels).every(
      (i) =>
        typeof i == 'object' &&
        i !== null &&
        'title' in i &&
        'width' in i &&
        Object.values(i).every((i) => typeof i == 'string'),
    )
  )
    return false;

  return true;
}
