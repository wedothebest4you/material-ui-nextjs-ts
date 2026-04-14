import createOrModifyCollections from '../../utils/createOrModifyCollections';
import { Db } from '../../types';
import createIndexes from '../../utils/createIndexes';

export default async function (db: Db) {
  const collectionName = 'object_versions';

  await createOrModifyCollections(db, collectionName, {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Object versions',
        required: ['objectName', 'objectType', 'version', 'createdAt'],
        additionalProperties: false,
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
            bsonType: 'string',
            description: 'Latest schema version',
            enum: ['v1'],
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
      },
    },
    validationLevel: 'strict',
    validationAction: 'error',
  });

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
