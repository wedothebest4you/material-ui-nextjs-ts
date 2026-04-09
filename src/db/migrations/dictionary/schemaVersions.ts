import ensureCollection from '../../utils/ensureCollection';
import { Db } from '../../types';
import ensureIndex from '../../utils/ensureIndex';

const KeyInfo = {
  collection: 'schema_versions',
  index: 'ux_collection_schema_version',
  version: 'v1',
};

export default async function (db: Db) {
  await ensureCollection(db, KeyInfo.collection, {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Schema versions',
        required: ['collection', 'version', 'updatedAt'],
        additionalProperties: false,
        properties: {
          version: {
            bsonType: 'string',
            description: 'Latest schema version',
            enum: ['v1'],
          },
          _id: { bsonType: 'objectId' },

          collection: {
            bsonType: 'string',
            description: 'Collection name',
            maxLength: 20,
          },

          updatedAt: {
            bsonType: 'date',
          },
        },
      },
    },
    validationLevel: 'strict',
    validationAction: 'error',
  });

  await ensureIndex(db, {
    collection: KeyInfo.collection,
    indexName: KeyInfo.index,
    version: KeyInfo.version,
    keys: { collection: 1 },
    options: {
      unique: true,
    },
  });
}
