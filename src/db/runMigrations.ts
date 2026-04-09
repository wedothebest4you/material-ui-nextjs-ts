import fs from 'fs/promises';
import path from 'path';
import { Db, MigrationFunction } from './types';
import errorHandler from './utils/errorHanlder';
import { acquireLock, releaseLock } from './utils/migrationLocks';

export async function runMigrations(db: Db): Promise<void> {
  const nodeId = process.env.NODE_ID || 'node-' + Date.now();
  await acquireLock(db, nodeId);

  const migrationsRoot = path.join(__dirname, './migrations');
  const archiveRoot = path.join(__dirname, './archivals');

  const dictionaryDir = path.join(migrationsRoot, 'dictionary');
  const schemaDir = path.join(migrationsRoot, 'schema');

  const dictionaryArchive = path.join(archiveRoot, 'dictionary');
  const schemaArchive = path.join(archiveRoot, 'schema');

  await ensureFolders([
    migrationsRoot,
    dictionaryDir,
    schemaDir,
    archiveRoot,
    dictionaryArchive,
    schemaArchive,
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

  await runParallelMigrations(db, schemaDir, schemaArchive);

  console.log('All migrations completed');
}

async function ensureFolders(paths: string[]) {
  for (const p of paths) {
    try {
      await fs.mkdir(p, { recursive: false });
    } catch {
      // console.error('\x1b[31mCannot create folder\x1b[0m', p);
      // process.exit(1);
      errorHandler(db, '\x1b[31mCannot create folder\x1b[0m', p, null);
    }
  }
}

async function runParallelMigrations(
  db: Db,
  migrationsDir: string,
  archiveDir: string,
  concurrency: number = 4,
): Promise<void> {
  const files = (await fs.readdir(migrationsDir)).filter((f) =>
    f.endsWith('.js'),
  );
  // .sort()
  // sort is not required.
  // All scripts in the same folder can process in any order

  if (files.length === 0) {
    errorHandler(`No migrations in ${migrationsDir}`, undefined, null);
  }

  const queue = [...files];
  async function worker(): Promise<void> {
    while (queue.length > 0) {
      const file = queue.shift();

      if (!file) return;

      const fullPath = path.join(migrationsDir, file);

      try {
        console.log(`Running migration: ${file}`);

        const module = await import(fullPath);

        const migration: unknown = module.default ?? module;

        if (!isMigrationFunction(migration)) {
          throw new Error(
            `Migration ${file} must export (db: Db) => Promise<void>`,
          );
        }

        await migration(db);

        await fs.rename(fullPath, path.join(archiveDir, file));

        console.log(`Archived: ${file}`);
      } catch (err: unknown) {
        // console.error('\x1b[31mMigration failed:\x1b[0m', file);

        // if (err instanceof Error) console.error(err.message);
        // else console.error(err);

        // process.exit(1);
        errorHandler('\x1b[31mMigration failed:\x1b[0m', file, err);
      }
    }
  }
  //this code restricts the number of concurrent tasks
  const workers = Array.from(
    { length: Math.min(concurrency, files.length) },
    () => worker(),
  );

  await Promise.all(workers);
}

function isMigrationFunction(value: unknown): value is MigrationFunction {
  return typeof value === 'function' && value.length === 1;
}
