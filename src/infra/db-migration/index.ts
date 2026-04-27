import fs from 'fs/promises';
import path from 'path';
import { Db, isMigrationItem } from './types';
import fastfailHandler from './errorHanlder';
import { acquireLock, releaseLock } from './processLocks';
import dbMigrate from './db-migrate';

export async function createOrModifyDBObjects(db: Readonly<Db>): Promise<void> {
  try {
    console.log('🚀 Objects migration started...');
    const nodeId = process.env.NODE_ID || 'node-' + Date.now();
    await acquireLock(db, nodeId);

    const migrationsRoot = path.join(__dirname, './db-migration');
    const archiveRoot = path.join(__dirname, './archivals');

    const dictionaryDir = path.join(migrationsRoot, 'dictionary');
    const AppSchemaDir = path.join(migrationsRoot, 'application');

    const dictionaryArchive = path.join(archiveRoot, 'dictionary');
    const AppSchemaArchive = path.join(archiveRoot, 'application');

    await ensureFolders([
      migrationsRoot,
      dictionaryDir,
      AppSchemaDir,
      archiveRoot,
      dictionaryArchive,
      AppSchemaArchive,
    ]);

    /*
  PHASE 1
  Data dictionaries (parallel)
  */

    await runParallelMigrations(db, dictionaryDir, dictionaryArchive);

    /*
  PHASE 2
  Application collections (parallel)
  */

    await runParallelMigrations(db, AppSchemaDir, AppSchemaArchive);

    console.log('🏆 Congratulations!!! All migrations completed.');
    await releaseLock(db);
  } catch (err) {
    fastfailHandler('❌ error', err, db);
  }
}

async function ensureFolders(paths: readonly string[]) {
  console.log('🔍 Ensuring paths...');
  for (const p of paths) {
    await fs.access(p);
  }
}

async function runParallelMigrations(
  db: Readonly<Db>,
  migrationsDir: string,
  archiveDir: string,
  concurrency: number = 4,
): Promise<void> {
  console.log('⚙️/🔧 Executing scripts...');
  const files = (await fs.readdir(migrationsDir)).filter((f) =>
    f.endsWith('.js'),
  );

  if (files.length === 0) {
    throw new Error(`❌ No migration scripts in ${migrationsDir}`);
  }

  const queue = [...files];
  const worker = async function (): Promise<void> {
    while (queue.length > 0) {
      const file = queue.shift();

      if (!file) return;

      const fullPath = path.join(migrationsDir, file);

      console.log(`📝 Running migration: ${file}`);

      const itemDefaultOrNamed = await import(fullPath);

      const migrationItem: unknown =
        itemDefaultOrNamed.default ?? itemDefaultOrNamed;

      if (!isMigrationItem(migrationItem)) {
        throw new Error(
          `❌ Migration ${file} has an invalid item, please check the keys and values`,
        );
      }

      await dbMigrate(db, migrationItem);

      await fs.rename(fullPath, path.join(archiveDir, file));

      console.log(`✅️ Script execution finished & Archived: ${file}`);
    }
  };
  //this code restricts the number of concurrent tasks
  const workers = Array.from(
    { length: Math.min(concurrency, files.length) },
    () => worker(),
  );

  await Promise.all(workers);
}

/**
 * ----------------------------------------------------------------------------
 * Module: Database migration uitility
 * ----------------------------------------------------------------------------
 * Version: v1
 * Dated : 15.Apr.26
 *
 * Purpose:
 * This utility script creates and updates MongoDB objects through the object definitions
 * given in the specific folders - dictionary and application. While the directory dictionary is
 * intended to host definitions of objects essential for functionality of this
 * utility script itself, the schema directory is meant for definitions of application objects.
 *
 * Scope:
 * With the version v1, this utility handles followingh two actions:
 * - Create and update collection objects
 * - Create index objects
 *
 * IMPORTANT
 * - No drop method : This utility will not drop any of the objects in the database.
 * - Strictly the given :
 * ---Collection: This uitility will create or update only those collections
 * ---for which the definitions are hosted in the specific two folders: dictionary and schema
 *
 * Responsibilities:
 * - Create and update data dictionary collections and indexes
 * - Create application collections and indexes
 * - Record schema versions against each object
 *
 * Design Principles:
 * - Fast-fail on errors :
 * -- Since the data definition statements are executed independently,
 * -- and cannot be secured by transaction, the executional integrity
 * -- of the objects is implemented by a fast-fail mechansim.
 * -- it may mean the exeption if any occured at any point of execution,
 * -- will be thrown immediately to the single fast-fail handler,
 * -- and the execution of the script will be stopped with the appropriate
 * -- error message displayed at the console. Therefore the deployer is
 * -- responsible to diagnose and correct the issue by fixing the respective definition
 * -- scripts, and re-run the utility to resume the process. A successfull migration
 * -- can be assured when the system terminates with the greeting of successfull completion.
 * -
 * - Single source of truth: schema_versions collection
 *
 * Dependencies:
 * - MongoDB Node.js Driver (Db)
 *
 * ----------------------------------------------------------------------------
 */
