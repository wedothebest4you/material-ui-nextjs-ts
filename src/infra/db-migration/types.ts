import type { Db, IndexDescription, CreateIndexesOptions } from 'mongodb';
export { MongoServerError } from 'mongodb';
//re-export / import and export
export type { Db };

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

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AppJSONSchemaNode = {
  bsonType: BsonType | BsonType[];
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

type IndexDescriptionWithVersion = IndexDescription & {
  name: string;
  migrationVersion: string;
};

type JSONSchema = {
  title: string;
  version: string;
  JSONschema: AppJSONSchema;
};

export type CreateIndexesParameters = {
  indexSpecs: IndexDescriptionWithVersion[];
  options?: CreateIndexesOptions;
};

type MigrationItemBase = { collectionName: string };
type MigrationItemSchema = {
  schema: JSONSchema;
  indexes?: CreateIndexesParameters;
};
type MigrationItemIndexes = {
  schema?: JSONSchema;
  indexes: CreateIndexesParameters;
};

export type DBMigrationItem = MigrationItemBase &
  (MigrationItemSchema | MigrationItemIndexes);

export function isMigrationItem(item: unknown): item is DBMigrationItem {
  if (
    !isRecord(item) ||
    !('collectionName' in item) ||
    typeof item.collectionName !== 'string'
  ) {
    return false;
  }

  return (
    ('schema' in item && hasSchema(item.schema)) ||
    ('indexes' in item && hasIndexes(item.indexes))
  );
}

export function hasIndexes(indexes: unknown): indexes is IndexParams[] {
  return Array.isArray(indexes) && indexes.every(reIndexParams);
}

type PropertyKey = 'string';

type ObjectRecord = Record<PropertyKey, unknown>;

function isRecord(value: unknown): value is ObjectRecord {
  return value != null && typeof value === 'object';
}

function isAppJSONSchema(value: unknown): value is AppJSONSchema {
  return (
    isRecord(value) &&
    'bsonType' in value &&
    value.bsonType === 'object' &&
    'properties' in value &&
    isRecord(value.properties)
  );
}

export function hasSchema(schema: unknown): schema is JSONSchema {
  return (
    isRecord(schema) &&
    'title' in schema &&
    typeof schema.title === 'string' &&
    'version' in schema &&
    typeof schema.version === 'string' &&
    'JSONschema' in schema &&
    isAppJSONSchema(schema.JSONschema)
  );
}

function isIndexKeys(value: unknown): value is Record<string, 1 | -1> {
  return (
    isRecord(value) &&
    Object.entries(value).length > 0 &&
    Object.values(value).every(
      (direction) => direction === 1 || direction === -1,
    )
  );
}

// function hasOnlyAllowedOptionKeys(
//   value: Record<PropertyKey, unknown>,
// ): boolean {
//   return Object.keys(value).every((key) => allowedOptionKeys.includes(key));
// }

function isSafeIndexOptions(value: unknown): value is SafeIndexOptions {
  if (value === undefined) {
    return true;
  }

  if (!isRecord(value)) {
    return false;
  }

  const hasValidUnique =
    !('unique' in value) || typeof value.unique === 'boolean';

  const hasValidSparse =
    !('sparse' in value) || typeof value.sparse === 'boolean';

  const hasValidExpireAfterSeconds =
    !('expireAfterSeconds' in value) ||
    typeof value.expireAfterSeconds === 'number';

  const hasValidPartialFilterExpression =
    !('partialFilterExpression' in value) ||
    isRecord(value.partialFilterExpression);

  return (
    hasValidUnique &&
    hasValidSparse &&
    hasValidExpireAfterSeconds &&
    hasValidPartialFilterExpression
  );
}

function reIndexParams(value: unknown): value is IndexParams {
  return (
    isRecord(value) &&
    'indexName' in value &&
    typeof value.indexName === 'string' &&
    'version' in value &&
    typeof value.version === 'string' &&
    'keys' in value &&
    isIndexKeys(value.keys) &&
    isSafeIndexOptions('options' in value ? value.options : undefined)
  );
}
