import { Db, createIndexParamsNameRequired, INDEX } from './types';
import checkDuplicateVersion from './checkDuplicateVersion';
import recordObjectVersion from './recordNewVersion';

export default async function createIndexes(
  db: Db,
  collection: string,
  params: IndexParams,
): Promise<void> {
  const { indexName, version, keys, options = {} } = params;

  console.log(`🔍 Ensuring Index - ${indexName}`);

  if (!version) {
    throw new Error(`The script has no version set for the new index object`);
  }

  await checkDuplicateVersion(db, {
    objectName: indexName,
    objectType: INDEX,
    baseObjectName: collection,
    version,
  });

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

  await recordObjectVersion(db, {
    objectName: newIndexName,
    objectType: INDEX,
    baseObjectName: collection,
    version,
  });
}
