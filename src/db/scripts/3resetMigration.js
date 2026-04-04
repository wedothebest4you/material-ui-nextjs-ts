const connectDB = require('../uitils/connection');

function resetMigrations(db) {
  const { db } = connectDB;

  archiveExistingMigrations(db);

  const result = db.migrations.deleteMany({});

  print(`Deleted ${result.deletedCount} migration records`);
}

function archiveExistingMigrations(db) {
  const collections = db.getCollectionNames();

  if (!collections.includes('migrations')) {
    print('No migrations collection found.');
    return;
  }

  const records = db.migrations.find().toArray();

  if (records.length === 0) {
    print('No migration records to archive.');
    return;
  }

  const snapshot = {
    archivedAt: new Date(),
    recordCount: records.length,
    migrations: records,
  };

  db.migrations_log.insertOne(snapshot);

  print('Archived migration snapshot with', records.length, 'records.');
}

resetMigrations();
