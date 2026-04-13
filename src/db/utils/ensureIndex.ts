import { ListIndexesCursor } from 'mongodb';
import { Db, EnsureIndexParams, ObjectType, IndexDescription } from '../types';
import ensureNewIndexVersion from './ensureNewIndexVersion';
import recordObjectVersion from './recordNewVersion';

export default async function ensureIndex(
  db: Db,
  params: EnsureIndexParams,
): Promise<void> {
  const { collection, indexName, version, keys, options = {} } = params;
  const INDEX_TYPE: ObjectType = 'idx';

  console.log(`🔍 Ensuring Index - ${indexName}`);

  if (!version) {
    throw new Error(`The script has no version set for the new index object`);
  }

  ensureNewIndexVersion(db, indexName, INDEX_TYPE, collection, version);

  const coll = db.collection(collection);

  if (!coll) {
    throw new Error(
      `The collection ${coll} does not exist for the index ${indexName}`,
    );
  }

  const newIndexName = `${indexName}_v${version}`;

  console.log(`Creating index ${newIndexName}`);

  await coll.createIndex(keys, {
    ...options,
    name: newIndexName,
  });

  await recordObjectVersion(db, newIndexName, INDEX_TYPE, version);
}
