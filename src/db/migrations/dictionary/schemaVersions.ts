import ensureCollection from '../../utils/ensureCollection';
import { Db } from '../../types';
import ensureIndex from '../../utils/ensureIndex';

const KeyInfo = {
  collection: 'object_versions',
  index: 'ux_object_schema_version',
  indexVersion: 'v1',
};

export default async function (db: Db) {
  await ensureCollection(db, KeyInfo.collection, {
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

  await ensureIndex(db, {
    collection: KeyInfo.collection,
    indexName: KeyInfo.index,
    version: KeyInfo.indexVersion,
    keys: { objectName: 1, baseObjectName: 1 },
    options: {
      unique: true,
    },
  });
}
