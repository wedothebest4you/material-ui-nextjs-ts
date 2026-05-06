// Type-Only Imports and Export
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html

import type {
  CreateCollectionOptions,
  IndexDescription,
  CreateIndexesOptions,
  RunCommandOptions,
  Abortable,
} from 'mongodb';

//re-export / import and export
export { MongoServerError } from 'mongodb';
export type { Db, IndexDirection } from 'mongodb';

import getAuditJSONSchema from './get-audit-json-schema';
import getVersionJSONSchema from './get-version-json-schema';
import getComposedValidator from './get-composed-schema';

type BsonType = 'object' | 'string' | 'objectId' | 'date' | 'null' | 'int';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AppJSONSchemaNode = {
  bsonType?: BsonType | BsonType[];
  // properties: Record<string, Optional<AppJSONSchemaNode, 'properties'>>;
  properties?: Record<string, AppJSONSchemaNode>;
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
  version: number;
}

type ValidationLevel = 'strict' | 'moderate' | 'off';
type ValidationAction = 'error' | 'warn';

type AuditJSONSchema = ReturnType<typeof getAuditJSONSchema>;
type VersionJSONSchema = ReturnType<typeof getVersionJSONSchema>;

export type ComposedJSONSchema = {
  $jsonSchema: {
    allOf: [AppJSONSchema, VersionJSONSchema, AuditJSONSchema];
  };
};

interface CreateCollectionOptionsExtended extends CreateCollectionOptions {
  validator: ComposedJSONSchema;
  validationLevel?: ValidationLevel;
  validationAction?: ValidationAction;
}

export interface CreateOrModifyCollectionOptions
  extends CreateCollectionOptionsExtended, RunCommandOptions, Abortable {}

export type IndexDescriptionWithVersion = IndexDescription & {
  migrationVersion: number;
  versionName: string | undefined;
};

export type CreateIndexesParameters = {
  indexSpecs: IndexDescriptionWithVersion[];
  options?: CreateIndexesOptions;
};

type MigrationCollection = {
  createOrModifyCollectionOptions: CreateOrModifyCollectionOptions;
  createIndexes?: CreateIndexesParameters;
};

type MigrationIndexes = {
  createOrModifyCollectionOptions?: CreateOrModifyCollectionOptions;
  createIndexes: CreateIndexesParameters;
};

export type MigrationDefinition = {
  collectionName: string;
} & (MigrationCollection | MigrationIndexes);

export type MigrationItem = {
  collectionName: string;
} & (
  | {
      appJSONSchema: AppJSONSchema;
      createIndexes?: CreateIndexesParameters;
    }
  | {
      appJSONSchema?: AppJSONSchema;
      createIndexes: CreateIndexesParameters;
    }
);

export function isMigrationItem(item: unknown): item is MigrationItem {
  if (
    !isRecord(item) ||
    !('collectionName' in item) ||
    typeof item.collectionName !== 'string'
  ) {
    return false;
  }

  return 'appJSONSchema' in item || 'createIndexes' in item;
}

export function hasCreateIndexParameters(
  indexes: unknown,
): indexes is CreateIndexesParameters {
  return hasIndexSpecs(indexes);
  // return Array.isArray(indexes) && indexes.every(key);
}

function hasIndexSpecs(
  indexes: unknown,
): indexes is IndexDescriptionWithVersion {
  // it must be an object with the key indexSpecs
  if (!(isRecord(indexes) && 'indexSpecs' in indexes)) {
    return false;
  }

  // it must also have a value of an array of index descriptions
  if (!Array.isArray(indexes.indexSpecs)) {
    return false;
  }

  // each item of the array must have a valid index description
  for (const indexDescription of indexes.indexSpecs) {
    if (!hasIndexDescription(indexDescription)) {
      return false;
    }
  }
  return true;
}

function hasIndexDescription(
  indexDescription: unknown,
): indexDescription is IndexDescriptionWithVersion {
  // must be a record with the keys
  // migrationVersion, versionName and key
  if (
    !(
      isRecord(indexDescription) &&
      'migrationVersion' in indexDescription &&
      'versionName' in indexDescription &&
      'key' in indexDescription &&
      isRecord(indexDescription.key)
    )
  ) {
    return false;
  }

  // and each index key has index direction
  for (const indexDirection of Object.values(indexDescription.key)) {
    if (
      !(
        typeof indexDescription === 'number' &&
        (indexDescription !== 1 || indexDescription !== -1)
      )
    ) {
      return false;
    }
  }
  return true;
}

type PropertyKey = 'string';

type ObjectRecord = Record<PropertyKey, unknown>;

function isRecord(value: unknown): value is ObjectRecord {
  return value != null && typeof value === 'object';
}

function isAppJSONSchema(schema: unknown): schema is AppJSONSchema {
  return (
    isRecord(schema) &&
    'bsonType' in schema &&
    schema.bsonType === 'object' &&
    'properties' in schema &&
    isRecord(schema.properties)
  );
}

// schema must be an object
// it must have the key title of type string
// it also must have the key version of type number
// it must has the key JSON
export function hasSchema(schema: unknown): schema is AppJSONSchemaExtended {
  return (
    isRecord(schema) &&
    'title' in schema &&
    typeof schema.title === 'string' &&
    'version' in schema &&
    typeof schema.version === 'number' &&
    'JSONschema' in schema &&
    isAppJSONSchema(schema.JSONschema)
  );
}

// The following interface has named as per the documentaion over here:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#syntax
// Aside : The document set against the key validator can be a query document as well.
// for example, a query documnent {1:2} will forbid insertion of all documents except
// the documents like these -  db.collection.insertOne({1:2}) or db.collection.insertOne({"1":2}).
// interface ValidatorDocument<T>> {
//   $jsonSchema: ComposedValidator<T>;
// }

// The interface name is as per the reference:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#definition

const DB_OBJECT_TYPES = {
  COLLECTION: 'coll',
  INDEX: 'indx',
} as const;

export const { COLLECTION, INDEX } = DB_OBJECT_TYPES;

type TypeOfDBObjectType = typeof DB_OBJECT_TYPES;

type DBObjectType = TypeOfDBObjectType[keyof TypeOfDBObjectType];

export type DBObjectVersionInfo =
  | {
      objectName: string;
      objectType: typeof COLLECTION;
      version: number;
      baseObjectName?: undefined;
    }
  | {
      objectName: string;
      objectType: typeof INDEX;
      baseObjectName: string;
      version: number;
    };

export interface ObjectVersionDocument {
  _id: string;
  objectType: DBObjectType;
  objectName: string;
  versionCurrent: number;
}
// // The folloewing interface named as DbObjectVersion
// // since the key version is applicable to Indexe objects as well.
// // If it was used exclisively for collections,
// // then it would have been ideal to name as SchemaVersion or
// // CollectionVersion. That is not the case in this utility.
// interface DbObjectVersion {
//   bsonType: 'string';
//   description: string;
//   enum: [string];
// }

// The following interface has named as JsonSchemaObject according to documentaion over here:
// https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#mongodb-query-op.-jsonSchema
//This base JSONSchema interface sets the following basic requiremennts:
// 1. The JSONschema object should be the type object.
// 2. The schema must have a title
// 3. It must have atleast one string propery minimum
// 4. It should have at least one key required.
// 5. It should not allow any additional keys other than the listed keys in the Validator document.

// type BaseJSONSchemaProperties = {
//   version: {
//     bsonType: 'int';
//     description: string;
//     enum: [number];
//   };
//   createdAt: {
//     bsonType: 'date';
//     description: string;
//   };
//   updatedAt: {
//     bsonType: ['date', 'null'];
//     description: string;
//   };
//   deletedAt: {
//     bsonType: ['date', 'null'];
//     description: string;
//   };
//   delFlag: {
//     bsonType: ['null', 'string'];
//     description: string;
//     enum: ['x', null];
//   };
// };

// export interface BaseJSONSchemaNode {
//   bsonType: 'object';
//   title: string;
//   properties: BaseJSONSchemaNode;
//   required: [keyof BaseJSONSchemaNode, ...(keyof BaseJSONSchemaNode)[]];
//   enum?: string[];
//   additionalProperties: false;
// }
