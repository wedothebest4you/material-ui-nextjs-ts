import { MigrationItemDefinition, AppJSONSchema } from '../types';

const schemaVersionsJSONSchema = {
  bsonType: 'object',
  title: 'Object versions',
  version: 1,
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

export const migrationItem: MigrationItemDefinition = {
  collectionName: 'object_versions',
  collectionDescription: {
    createOrModifyCollectionOptions: {
      validator: schemaVersionsJSONSchema,
    },
    commandDocument: {},
    commandOptions: {},
  },
  createIndexesParameters: {
    indexSpecs: [
      {
        migrationVersion: 1,
        key: { objectName: 1, baseObjectName: 1 },
        name: 'ui_objectName_baseObjectName',
        unique: true,
      },
    ],
  },
};
