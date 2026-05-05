import { DBMigrationItem, AppJSONSchema } from '../types';

const schemaVersions = {
  bsonType: 'object',
  required: ['objectName', 'objectType', 'version', 'createdAt'],
  properties: {
    _id: { bsonType: 'objectId' },
    objectName: {
      bsonType: 'string',
      description: 'Object name',
      maxLength: 20,
    },
    objectType: {
      bsonType: 'string',
      description: 'Object type',
      maxLength: 3,
      enum: ['col', 'idx'],
    },
    version: {
      bsonType: 'int',
      description: 'Version',
      maxLength: 5,
    },
    baseObjectName: {
      bsonType: 'string',
      description: 'Base Object name',
      maxLength: 20,
    },
  },
  oneOf: [
    {
      bsonType: 'object',
      properties: {
        objectType: { bsonType: 'string', enum: ['idx'] },
      },
      required: ['baseObjectName'],
    },
    {
      bsonType: 'object',
      properties: { objectType: { bsonType: 'string', enum: ['col'] } },
    },
  ],
} as const satisfies AppJSONSchema;

export const migrationItem: DBMigrationItem = {
  collectionName: 'object_versions',
  schema: {
    title: 'Object versions',
    version: 1,
    JSONschema: schemaVersions,
  },
  indexes: {
    indexSpecs: [
      {
        migrationVersion: 1,
        key: { objectName: 1, baseObjectName: 1 },
        versionName: undefined,
        unique: true,
      },
    ],
  },
};
