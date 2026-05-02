import { Db, CreateIndexesParameters, INDEX } from './types';
import checkDuplicateVersion from './checkDuplicateVersion';
import recordObjectVersion from './recordNewVersion';

export default async function createIndexes(
  db: Db,
  collection: string,
  params: CreateIndexesParameters,
): Promise<void> {
  const { indexSpecs } = params;

  const coll = db.collection(collection);

  if (!coll) {
    throw new Error(`The collection ${coll} does not exist to create its in`);
  }
  //es5 will mark an error on this usage, so esnext to target
  for (const [index, { name, migrationVersion }] of indexSpecs.entries()) {
    console.log(`🔍 Validating 
      spec. of the Index - ${name}`);
    if (!migrationVersion) {
      throw new Error(`The script has no version set for the new index object`);
    }
    await checkDuplicateVersion(db, {
      objectName: name,
      objectType: INDEX,
      baseObjectName: collection,
      version: migrationVersion,
    });
    indexSpecs[index].name = `${name}-${migrationVersion}`;
  }

  await coll.createIndexes(params.indexSpecs, params.options);

  for (const { name, migrationVersion } of indexSpecs) {
    await recordObjectVersion(db, {
      objectName: name,
      objectType: INDEX,
      baseObjectName: collection,
      version: migrationVersion,
    });
  }
}
