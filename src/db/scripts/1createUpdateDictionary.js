const connectDB = require('./connection');

async function createOrUpdateMigrationDictionary(db) {
  const { db } = await connectDB();
  const name = 'migrations';

  const schemaValidation = {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'migrations',
        required: ['_id', 'name', 'appliedAt', 'version'],

        additionalProperties: false,

        properties: {
          version: {
            bsonType: 'string',
            enum: ['v1'],
            title: 'schema version',
          },
          _id: {
            bsonType: 'objectId',
            title: 'Migration record id',
          },

          name: {
            bsonType: 'string',
            required: true,
            maxLength: 20,
            title: 'Migration file name',
          },

          appliedAt: {
            bsonType: 'date',
            title: 'Execution timestamp',
          },
        },
      },
    },
  };

  const exists = db.getCollectionNames().includes(name);

  if (!exists) {
    db.createCollection(name, schemaValidation);

    print('Created migrations collection');
  } else {
    db.runCommand({
      collMod: name,
      validator: schemaValidation.validator,
    });

    print('Updated migrations schema');
  }

  ensureMigrationIndexes(db);
}

function ensureMigrationIndexes(db) {
  const coll = db.getCollection('migrations');

  const indexes = coll.getIndexes();

  const exists = indexes.some((i) => i.name === 'ux_migration_name');

  if (!exists) {
    coll.createIndex(
      { name: 1 },
      {
        name: 'ux_migration_name',
        unique: true,
      },
    );

    print('Created migration index ux_migration_name');
  }
}
createOrUpdateMigrationDictionary();
