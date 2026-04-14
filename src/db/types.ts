import type { Db, CreateIndexesOptions } from 'mongodb';
export type { Db };
export type { IndexDescription } from 'mongodb';

export interface VersionProperty {
  bsonType: 'string';
  description: string;
  enum: [string];
}

interface JsonSchema {
  bsonType: 'object';
  title: string;
  properties: {
    version: VersionProperty;
    [key: string]: unknown;
  };
  oneOf?: [
    {
      properties: { [key: string]: { enum: [string] } };
      required: [string];
    },
    {
      properties: { [key: string]: { enum: [string] } };
    },
  ];
  required: string[];
  additionalProperties: false;
}

interface SchemaValidator {
  $jsonSchema: JsonSchema;
}

export interface BaseSchemaValidator {
  validator: SchemaValidator;
  validationLevel?: 'strict';
  validationAction?: 'error';
}

const ObjectType = {
  COLLECTION: 'coll',
  INDEX: 'indx',
} as const;

export const { COLLECTION, INDEX } = ObjectType;

type ObjectTypeType = (typeof ObjectType)[keyof typeof ObjectType];

export type VersionParams =
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
  objectType: ObjectTypeType;
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
