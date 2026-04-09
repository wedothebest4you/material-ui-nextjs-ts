import { Db } from '../types';
import { releaseLock } from './migrationLocks';

export default function errorHanlder(
  db: Db,
  errorContext: string,
  optionalContext: string | undefined,
  err: unknown,
) {
  console.error(`${errorContext} ${optionalContext || ''}`);

  if (err instanceof Error) console.error(err.message);
  else console.error(err);

  releaseLock(db);
  process.exit(1);
}
