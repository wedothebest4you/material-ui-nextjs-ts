// Prevents multiple servers running migrations simultaneously.

async function acquireLock(db, nodeId) {
  const res = await db.collection('migration_lock').findOneAndUpdate(
    { _id: 'migration_lock', locked: { $ne: true } },

    {
      $set: {
        locked: true,
        locked_by: nodeId,
        locked_at: new Date(),
      },
    },

    { upsert: true, returnDocument: 'after' },
  );

  if (res.value.locked_by !== nodeId) {
    throw new Error('Another node is executing migrations');
  }
}

async function releaseLock(db) {
  await db.collection('migration_lock').updateOne(
    { _id: 'migration_lock' },

    { $set: { locked: false } },
  );
}

module.exports = { acquireLock, releaseLock };
