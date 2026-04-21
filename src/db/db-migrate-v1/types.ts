import type { Db, CreateIndexesOptions } from 'mongodb';
//re-export / import and export
export type { Db };
export type { IndexDescription } from 'mongodb';

// The folloewing interface named as DbObjectVersion
// since the key version is applicable to Indexe objects as well.
// If it was used exclisively for collections,
// then it would have been ideal to name as SchemaVersion or
// CollectionVersion. That is not the case in this utility.
interface DbObjectVersion {
  bsonType: 'string';
  description: string;
  enum: [string];
}

// The following interface has named as JsonSchemaObject according to documentaion over here:
// https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#mongodb-query-op.-jsonSchema
//This base JSONSchema interface sets the following basic requiremennts:
// 1. The JSONschema object should be the type object.
// 2. The schema must have a title
// 3. It must have atleast one string propery minimum
// 4. It should have at least one key required.
// 5. It should not allow any additional keys other than the listed keys in the Validator document.

type BaseJSONSchemaProperties = {
  version: DbObjectVersion;
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
  bsonType?: BsonType | readonly BsonType[];
  properties?: AppSchemaProperties;
  description?: string;
  minimum?: number;
  maximum?: number;
  maxLength?: number;
  items?: AppJSONSchemaNode;

  required?: [keyof AppSchemaProperties, ...(keyof AppSchemaProperties)[]];

  enum?: readonly unknown[];

  oneOf?: readonly AppJSONSchemaNode[];

  anyOf?: readonly AppJSONSchemaNode[];

  allOf?: readonly AppJSONSchemaNode[];
};

export interface AppJSONSchema extends AppJSONSchemaNode {
  bsonType: 'object';
}

export interface ComposedValidator<T, U> {
  $jsonSchema: {
    allOf: [T, U];
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
export interface CreateCollectionOptions<
  T extends BaseJSONSchema,
  U extends AppJSONSchema,
> {
  validator: ComposedValidator<T, U>;
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

export type MigrationFunction = (db: Db) => Promise<void>;

type SafeIndexOptions = Pick<
  CreateIndexesOptions,
  'unique' | 'sparse' | 'expireAfterSeconds' | 'partialFilterExpression'
>;

export interface EnsureIndexParams {
  collection: string;
  indexName: string;
  version: string;
  keys: Record<string, 1 | -1>;
  options?: SafeIndexOptions;
}
