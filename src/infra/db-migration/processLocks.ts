// Prevents multiple servers running migrations simultaneously.
import type { Db } from './types';
import logError from './errorHanlder';

const LOCK = 'X';

interface ProcessLock {
  _id: string;
}

export async function acquireLock(db: Db) {
  try {
    console.log('Acquiring migration lock');
    const collection = db.collection<ProcessLock>('migration_lock');
    await collection.insertOne({
      _id: LOCK,
    });
  } catch (error: unknown) {
    logError(`\x1b[31mAcquire failed\x1b[0m`, error);
  }
}

export async function releaseLock(db: Db) {
  try {
    console.log('Releasing migration lock');
    await db.collection<ProcessLock>('migration_lock').deleteOne({ _id: LOCK });
  } catch (err) {
    logError(`\x1b[31mreleaseLock failed\x1b[0m`, err);
  }
}
