import { Db, EnsureIndexParams, IndexVersionDocument } from '../types';

export default async function ensureIndex(
  db: Db,
  params: EnsureIndexParams,
): Promise<void> {
  const { collection, indexName, version, keys, options = {} } = params;

  const coll = db.collection(collection);

  const exists = await versionExists(db, collection, indexName, version);

  if (exists) {
    console.log(`Index ${indexName} already deployed at version ${version}`);

    return;
  }

  const currentVersion = await getCurrentVersion(db, collection, indexName);

  const newIndexName = `${indexName}_v${version}`;

  console.log(`Creating index ${newIndexName}`);

  await coll.createIndex(keys, {
    ...options,
    name: newIndexName,
  });

  if (currentVersion) {
    const oldIndexName = `${indexName}_v${currentVersion}`;

    console.log(`Dropping old index ${oldIndexName}`);

    try {
      await coll.dropIndex(oldIndexName);
    } catch {
      console.warn(`Old index ${oldIndexName} not found`);
    }
  }

  await recordIndexVersion(db, collection, indexName, version);
}

async function versionExists(
  db: Db,
  collection: string,
  indexName: string,
  version: string,
): Promise<boolean> {
  const doc = await db
    .collection<IndexVersionDocument>('index_versions')
    .findOne(
      { _id: `${collection}:${indexName}` },
      { projection: { versions: 1 } },
    );

  if (!doc) return false;

  return doc.revisions?.includes(version) ?? false;
}

async function getCurrentVersion(
  db: Db,
  collection: string,
  indexName: string,
): Promise<string | null> {
  const doc = await db
    .collection<IndexVersionDocument>('index_versions')
    .findOne(
      { _id: `${collection}:${indexName}` },
      { projection: { versionCurrent: 1 } },
    );

  if (!doc) return null;

  return doc.versionCurrent ?? null;
}

async function recordIndexVersion(
  db: Db,
  collection: string,
  indexName: string,
  version: string,
): Promise<void> {
  await db.collection<IndexVersionDocument>('index_versions').updateOne(
    { _id: `${collection}:${indexName}` },

    {
      $set: {
        collection,
        indexName,
        versionCurrent: version,
        updatedAt: new Date(),
      },

      $push: {
        versions: version,
      },
    },

    { upsert: true },
  );
}
