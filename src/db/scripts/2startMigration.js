// This file orchestrates everything.

const fs = require('fs');
const path = require('path');

const connectDB = require('../connection');
const { acquireLock, releaseLock } = require('./utils/migrationLock');

async function runMigrations() {
  const { client, db } = await connectDB();

  resetMigrationSystem(db);
  const nodeId = process.env.NODE_ID || 'node-' + Date.now();

  try {
    console.log('Acquiring migration lock');

    await acquireLock(db, nodeId);

    const migrationsCollection = db.collection('db_migrations');

    await migrationsCollection.createIndex({ name: 1 }, { unique: true });

    const migrationDir = path.join(__dirname, 'migrations');

    const files = fs
      .readdirSync(migrationDir)
      .filter((f) => f.endsWith('.js'))
      .sort();

    for (const file of files) {
      const migrationName = file.replace('.js', '');

      const executed = await migrationsCollection.findOne({
        name: migrationName,
      });

      if (executed) {
        console.log(`Skipping ${migrationName}`);

        continue;
      }

      console.log(`Running migration ${migrationName}`);

      const migration = require(path.join(migrationDir, file));

      try {
        await migration(db);

        await migrationsCollection.insertOne({
          name: migrationName,
          executed_at: new Date(),
          status: 'success',
        });

        console.log(`Migration complete ${migrationName}`);
      } catch (err) {
        await migrationsCollection.insertOne({
          name: migrationName,
          executed_at: new Date(),
          status: 'failed',
          error: err.message,
        });

        throw err;
      }
    }
  } finally {
    await releaseLock(db);

    await client.close();
  }
}

runMigrations();
