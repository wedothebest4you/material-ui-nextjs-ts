import type { Db, CreateIndexesOptions } from 'mongodb';
export type { Db };

export interface VersionProperty {
  bsonType: 'string';
  description: string;
  enum: [string];
}

export interface JsonSchema {
  bsonType: 'object';
  title: string;
  properties: {
    version: VersionProperty;
    [key: string]: unknown;
  };
  required: string[];
  additionalProperties: false;
}

export interface ValidatorSchema {
  $jsonSchema: JsonSchema;
}

export interface SchemaValidation {
  validator: ValidatorSchema;
  validationLevel?: 'strict';
  validationAction?: 'error';
}

export interface ObjectVersionDocument {
  _id: string;
  objectType: 'col' | 'ind';
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
