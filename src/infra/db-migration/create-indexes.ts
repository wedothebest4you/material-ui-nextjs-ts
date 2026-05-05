import { Db, CreateIndexesParameters, IndexDirection, INDEX } from './types';
import checkDuplicateVersion from './check-dup-version';
import recordObjectVersion from './record-new-ver';

export default async function createIndexes(
  db: Db,
  collection: string,
  params: CreateIndexesParameters,
): Promise<void> {
  const { indexSpecs } = params;
  const indexVersionNames = [];
  const coll = db.collection(collection);

  if (!coll) {
    throw new Error(`The collection ${coll} does not exist to create its in`);
  }
  //es5 will mark an error on this usage, so esnext to target
  for (const [
    index,
    { versionName, migrationVersion, key },
  ] of indexSpecs.entries()) {
    console.log(`🔍 Validating 
      spec. of the Index - ${name}`);
    if (!migrationVersion) {
      throw new Error(`The script has no version set for the new index object`);
    }
    indexVersionNames[index] =
      versionName || generateIndexVersionNames(migrationVersion, key);

    await checkDuplicateVersion(db, {
      objectName: indexVersionNames[index],
      objectType: INDEX,
      baseObjectName: collection,
      version: migrationVersion,
    });
  }

  await coll.createIndexes(params.indexSpecs, params.options);

  for (const [index, { migrationVersion }] of indexSpecs.entries()) {
    await recordObjectVersion(db, {
      objectName: indexVersionNames[index],
      objectType: INDEX,
      baseObjectName: collection,
      version: migrationVersion,
    });
  }
}

function generateIndexVersionNames(
  migrationVersion: number,
  key: Record<string, IndexDirection> | Map<string, IndexDirection>,
) {
  const generatedName = Object.entries(key)
    .map(([field, value]) => `${field}_${value}`)
    .join('_');
  const versionName = `${generatedName}-${migrationVersion}`;
  return versionName;
}
