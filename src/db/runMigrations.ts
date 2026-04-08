import fs from 'fs/promises';
import path from 'path';
import type { Db, MigrationFunction } from './types';
import errorHandler from './utils/errorHanlder';

export async function runMigrations(db: Db): Promise<void> {
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
      await fs.mkdir(p, { recursive: true });
    } catch {
      // console.error('\x1b[31mCannot create folder\x1b[0m', p);
      // process.exit(1);
      errorHandler('\x1b[31mCannot create folder\x1b[0m', p, null);
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
  // sort is not requirede.
  // All scripts in the same folder can process in any order

  if (files.length === 0) {
    console.log(`No migrations in ${migrationsDir}`);
    return;
  }

  const queue = [...files];
  // doubt : how does this worker work
  async function worker(): Promise<void> {
    while (queue.length > 0) {
      const file = queue.shift();

      if (!file) return;

      const fullPath = path.join(migrationsDir, file);

      try {
        console.log(`Running migration: ${file}`);

        const module = await import(fullPath);

        const migration: unknown = module.default ?? module;

        //doubt - why double work: a type guard and a type cast
        if (typeof migration !== 'function') {
          throw new Error(
            `Migration ${file} must export (db: Db) => Promise<void>`,
          );
        }

        await (migration as MigrationFunction)(db);

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

  const workers = Array.from(
    { length: Math.min(concurrency, files.length) },
    () => worker(),
  );

  await Promise.all(workers);
}
