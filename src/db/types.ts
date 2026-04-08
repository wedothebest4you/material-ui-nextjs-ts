import type { Db } from 'mongodb';
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

export interface SchemaRevision {
  schema_revision: string;
  migrated_at: Date;
}

export interface SchemaVersionDocument {
  _id: string;
  collection: string;
  latest_version: string;
  revisions: SchemaRevision[];
}

export type MigrationFunction = (db: Db) => Promise<void>;
