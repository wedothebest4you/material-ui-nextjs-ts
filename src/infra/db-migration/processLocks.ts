// Prevents multiple servers running migrations simultaneously.
import type { Db } from './types';
import logError from './errorHanlder';

const LOCK = 'X';

interface ProcessLock {
  _id: string;
}

export async function acquireLock(db: Db) {
  console.log('Acquiring migration lock');
  const collection = db.collection<ProcessLock>('migration_lock');
  await collection.insertOne({
    _id: LOCK,
  });
}

export async function releaseLock(db: Db) {
  console.log('Releasing migration lock');
  await db.collection<ProcessLock>('migration_lock').deleteOne({ _id: LOCK });
}
