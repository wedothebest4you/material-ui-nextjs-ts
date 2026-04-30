import type { Db, CreateIndexesOptions } from 'mongodb';
export { MongoServerError } from 'mongodb';
//re-export / import and export
export type { Db };
export type { IndexDescription } from 'mongodb';

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

type BaseJSONSchemaProperties = {
  version: {
    bsonType: 'string';
    description: string;
    enum: [string];
  };
  createdAt: {
    bsonType: 'date';
    description: string;
  };
  updatedAt: {
    bsonType: ['date', 'null'];
    description: string;
  };
  deletedAt: {
    bsonType: ['date', 'null'];
    description: string;
  };
  delFlag: {
    bsonType: ['null', 'x'];
    description: string;
  };
};

export interface BaseJSONSchema {
  bsonType: 'object';
  title: string;
  properties: BaseJSONSchemaProperties;
  required: [
    keyof BaseJSONSchemaProperties,
    ...(keyof BaseJSONSchemaProperties)[],
  ];
  additionalProperties: false;
}

type BsonType = 'object' | 'string' | 'objectId' | 'date' | 'null' | 'int';

type AppSchemaProperties = Record<string, AppJSONSchemaNode>;

type AppJSONSchemaNode = {
  bsonType?: BsonType | BsonType[];
  properties?: AppSchemaProperties;
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
}

export interface ComposedValidator {
  $jsonSchema: {
    allOf: [BaseJSONSchema, AppJSONSchema];
  };
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
export interface CreateCollectionOptions {
  validator: ComposedValidator;
  validationLevel?: 'strict';
  validationAction?: 'error';
}

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
      version: string;
      baseObjectName?: undefined;
    }
  | {
      objectName: string;
      objectType: typeof INDEX;
      baseObjectName: string;
      version: string;
    };

export interface ObjectVersionDocument {
  _id: string;
  objectType: DBObjectType;
  objectName: string;
  versionCurrent: string;
  revisions: string[];
}

//export type MigrationFunction = (db: Db) => Promise<void>;

type SafeIndexOptions = Pick<
  CreateIndexesOptions,
  'unique' | 'sparse' | 'expireAfterSeconds' | 'partialFilterExpression'
>;

export interface EnsureIndexParams {
  indexName: string;
  version: string;
  keys: Record<string, 1 | -1>;
  options?: SafeIndexOptions;
}

type JSONSchema = {
  title: string;
  version: string;
  JSONschema: AppJSONSchema;
};

type MigrationItemBase = { collectionName: string };

export type DBMigrationItem =
  | (MigrationItemBase & {
      schema: JSONSchema;
      indexes?: EnsureIndexParams[];
    })
  | (MigrationItemBase & {
      schema?: JSONSchema;
      indexes: EnsureIndexParams[];
    });

export function hasSchema(item: any): item is JSONSchema {
  const hasBase =
    item !== null &&
    typeof item === 'object' &&
    typeof item.collectionName === 'string';

  if (!hasBase) return false;

  const hasValidSchema =
    item.schema !== undefined &&
    item.schema !== null &&
    typeof item.schema === 'object' &&
    typeof item.schema.title === 'string' &&
    typeof item.schema.version === 'string' &&
    typeof item.schema.schema === 'object';

  return hasValidSchema;
}

export function hasIndexes(item: any): item is DBMigrationItem {
  const hasBase =
    item !== null &&
    typeof item === 'object' &&
    typeof item.collectionName === 'string';

  if (!hasBase) return false;

  const hasValidIndexes =
    item.indexes !== undefined && Array.isArray(item.indexes);

  // 4. Final Logic: Base is true AND (at least one optional block is valid)
  return hasValidIndexes;
}

export function isMigrationItem(item: any): item is DBMigrationItem {
  return hasSchema(item) || hasIndexes(item);
}
