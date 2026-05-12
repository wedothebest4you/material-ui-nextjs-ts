import {
  Db,
  CreateIndexesParametersDTOIn,
  IndexDirection,
  INDEX,
  DBObjectVersionInfo,
} from './types';
import recordObjectVersion from './record-new-ver';
import getCurrentVersion from './get-current-version';
import checkVersionMissing from './check-version-missing';
import checkVersionUnchanged from './check-version-unchanged';

export default async function createIndexes(
  db: Db,
  collection: string,
  params: CreateIndexesParametersDTOIn,
): Promise<void> {
  const { indexSpecs } = params;
  const indexVersionUnchanged = [];
  const coll = db.collection(collection);

  if (!coll) {
    throw new Error(`The collection ${coll} does not exist to create its in`);
  }
  //es5 will mark an error on this usage, so esnext to target
  for (const [index, { name, migrationVersion, key }] of indexSpecs.entries()) {
    if (!migrationVersion) {
      throw new Error(`The script has no version set for the new index object`);
    }
    const indexName = name
      ? `${name}_${migrationVersion}`
      : generateIndexVersionNames(migrationVersion, key);

    const versionInfo: DBObjectVersionInfo = {
      objectName: indexName,
      objectType: INDEX,
      baseObjectName: collection,
      newVersion: migrationVersion,
    };

    const currentVersion = await getCurrentVersion(db, versionInfo);

    if (checkVersionUnchanged(migrationVersion, currentVersion)) {
      indexVersionUnchanged[indexVersionUnchanged.length] = indexName;
      continue;
    }

    await checkVersionMissing(migrationVersion, currentVersion);

    indexSpecs[index].name = indexName;
  }

  // https://mongodb.github.io/node-mongodb-native/7.2/classes/Collection.html#createIndexes
  await coll.createIndexes(params.indexSpecs, params.options);

  for (const { migrationVersion, name } of indexSpecs) {
    await recordObjectVersion(db, {
      objectName: name!,
      objectType: INDEX,
      baseObjectName: collection,
      newVersion: migrationVersion,
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
