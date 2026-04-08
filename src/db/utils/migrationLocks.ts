// Prevents multiple servers running migrations simultaneously.
import type { Db } from '../types';
import errorHanlder from './errorHanlder';

interface MigartionLock {
  _id: string;
  locked: boolean;
  locked_by: string;
  locked_at: Date;
  value: {
    locked_by: string;
  };
}

export async function acquireLock(db: Db, nodeId: string) {
  try {
    const filter = { _id: 'migration_lock', locked: { $ne: true } };
    const update = {
      $set: {
        locked: true,
        locked_by: nodeId,
        locked_at: new Date(),
      },
    };
    const collection = db.collection<MigartionLock>('migration_lock');
    const res = await collection.findOneAndUpdate(
      filter,

      update,

      { upsert: true, returnDocument: 'after' },
    );
    if (res && res.value.locked_by !== nodeId) {
      throw new Error('Another node is executing migrations');
    }
  } catch (error: unknown) {
    // console.error('\x1b[31mAcquire failed:\x1b[0m');

    // if (error instanceof Error) {
    //   console.error(error.message);
    // } else console.error(error);

    // process.exit(1);
    errorHanlder('\x1b[31mAcquire failed:\x1b[0m', nodeId, error);
  }
}

export async function releaseLock(db: Db) {
  try {
    await db.collection<MigartionLock>('migration_lock').updateOne(
      { _id: 'migration_lock' },

      { $set: { locked: false } },
    );
  } catch (err) {
    errorHanlder('\x1b[31mreleaseLock failed:\x1b[0m', undefined, err);
  }
}
