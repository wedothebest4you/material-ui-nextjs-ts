const ensureCollection = require('../utils/ensureCollection');
const ensureIndex = require('../utils/ensureIndex');

module.exports = async function (db) {
  await ensureCollection(db, 'schema_versions', {
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

  const col = db.collection('schema_versions');

  await ensureIndex(
    col,
    { collection: 1 },
    { unique: true },
    { name: 'ux_collection_schema_version' },
  );
};
