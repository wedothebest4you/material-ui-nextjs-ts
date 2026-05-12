import fs from 'fs/promises';
import path from 'path';
import { Db } from './types';
import logError from './error-hanlder';
import { acquireLock, releaseLock } from './process-locks';
import dbMigrate from './db-migrate';
let lockAcquired = false;
let exitCode = 0;

export async function createOrModifyDBObjects(db: Readonly<Db>): Promise<void> {
  try {
    console.log('🚀 Objects migration started...');
    await acquireLock(db);
    lockAcquired = true;
    const migrationsRoot = path.join(__dirname, './db-migration');
    const archiveRoot = path.join(__dirname, './archivals');

    const dictionaryDir = path.join(migrationsRoot, 'dictionary');
    const AppSchemaDir = path.join(migrationsRoot, 'application');

    const dictionaryArchive = path.join(archiveRoot, 'dictionary');
    const AppSchemaArchive = path.join(archiveRoot, 'application');

    await assertRequiredPathsExist([
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
  } catch (err) {
    logError('❌ error', err);
    exitCode = 1;
  } finally {
    try {
      if (lockAcquired) {
        await releaseLock(db);
      }
    } catch (err) {
      logError('❌ error', err);
      exitCode = 1;
    }
    process.exit(exitCode);
  }

  async function assertRequiredPathsExist(paths: readonly string[]) {
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
    let fastfailed = false;

    console.log('⚙️/🔧 Executing scripts...');
    const files = (await fs.readdir(migrationsDir)).filter((f) =>
      f.endsWith('.js'),
    );

    if (files.length === 0) {
      throw new Error(`❌ No migration scripts in ${migrationsDir}`);
    }

    const queue = [...files];
    const worker = async function (): Promise<void> {
      // if any process failed, than stop processing
      while (!fastfailed && queue.length > 0) {
        const file = queue.shift();

        if (!file) return;
        try {
          const fullPath = path.join(migrationsDir, file);

          console.log(`📝 Running migration: ${file}`);

          const itemDefaultOrNamed = await import(fullPath);

          const migrationItem: unknown =
            itemDefaultOrNamed.default ?? itemDefaultOrNamed;

          await dbMigrate(db, migrationItem);

          await fs.rename(fullPath, path.join(archiveDir, file));

          console.log(`✅️ Script execution finished & Archived: ${file}`);
        } catch (err) {
          fastfailed = true;
          throw err;
        }
      }
    };
    //this code restricts the number of concurrent tasks
    const workers = Array.from(
      { length: Math.min(concurrency, files.length) },
      () => worker(),
    );
    await Promise.all(workers);
  }
}
