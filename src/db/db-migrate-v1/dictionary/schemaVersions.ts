import { Db, AppJSONSchema } from '../types';
import createOrModifyCollections from '../createOrModifyCollections';
import getBaseSchemaObject from '../getBaseSchemaObject';
import createIndexes from '../createIndexes';

export default async function (db: Db) {
  const collectionName = 'object_versions';

  const baseSchemaObject = getBaseSchemaObject('version', 'v1');

  const schemaVersions: AppJSONSchema = {
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
      baseObjectName: {
        bsonType: 'string',
        description: 'Base Object name',
        maxLength: 20,
      },
      createdAt: {
        bsonType: 'date',
      },
      updatedAt: {
        bsonType: 'date',
      },
    },
    oneOf: [
      {
        properties: { objectType: { enum: ['idx'] } },
        required: ['baseObjectName'],
      },
      {
        properties: { objectType: { enum: ['col'] } },
      },
    ],
  };

  await createOrModifyCollections(
    db,
    collectionName,
    baseSchemaObject,
    schemaVersions,
  );

  await createIndexes(db, {
    collection: collectionName,
    indexName: 'ux_object_schema_version',
    version: 'v1',
    keys: { objectName: 1, baseObjectName: 1 },
    options: {
      unique: true,
    },
  });
}
