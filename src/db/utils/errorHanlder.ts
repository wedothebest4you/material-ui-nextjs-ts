import { Db } from '../types';
import { releaseLock } from './migrationLocks';

export default function fastfailHandler(
  errorContext: string,
  err?: unknown,
  db?: Db,
): never {
  console.error(`\x1b[31m Migration failed: ${errorContext}\x1b[0m`);
  if (err instanceof Error) console.error(err.message);
  else console.error(err);

  if (db) releaseLock(db);
  process.exit(1);
}
