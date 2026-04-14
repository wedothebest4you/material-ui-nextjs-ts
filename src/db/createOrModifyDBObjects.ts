import fs from 'fs/promises';
import path from 'path';
import { Db, MigrationFunction } from './types';
import fastfailHandler from './utils/errorHanlder';
import { acquireLock } from './utils/processLocks';

export async function createOrModifyDBObjects(db: Db): Promise<void> {
  try {
    console.log('🚀 Object migration started...');
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
  } catch (err) {
    fastfailHandler('error', err);
  }
}

async function ensureFolders(paths: string[]) {
  console.log('🔍 Ensuring paths...');
  for (const p of paths) {
    await fs.mkdir(p, { recursive: false });
  }
}

async function runParallelMigrations(
  db: Db,
  migrationsDir: string,
  archiveDir: string,
  concurrency: number = 4,
): Promise<void> {
  console.log('⚙️/🔧 Executing scripts...');
  const files = (await fs.readdir(migrationsDir)).filter((f) =>
    f.endsWith('.js'),
  );

  if (files.length === 0) {
    throw new Error(`❌ No migrations scripts in ${migrationsDir}`);
  }

  const queue = [...files];
  const worker = async function (): Promise<void> {
    while (queue.length > 0) {
      const file = queue.shift();

      if (!file) return;

      const fullPath = path.join(migrationsDir, file);

      console.log(`📝 Running migration: ${file}`);

      const module = await import(fullPath);

      const migration: unknown = module.default ?? module;

      if (!isMigrationFunction(migration)) {
        throw new Error(
          `❌ Migration ${file} must export (db: Db) => Promise<void>`,
        );
      }

      await migration(db);

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

function isMigrationFunction(value: unknown): value is MigrationFunction {
  return typeof value === 'function' && value.length === 1;
}
