import { Db, ObjectVersionDocument, DBObjectVersionInfo, INDEX } from './types';

export default async function recordObjectVersion(
  db: Db,
  versionInfo: DBObjectVersionInfo,
): Promise<void> {
  const { objectName, objectType, newVersion, baseObjectName } = versionInfo;

  console.log(`Updating object version ${newVersion}`);

  if (objectType === INDEX && !baseObjectName) {
    throw new Error(`BaseObject name is missing for the index ${objectName}`);
  }
  const objectVersions =
    db.collection<ObjectVersionDocument>('object_versions');

  await objectVersions.updateOne(
    {
      objectName: objectName,
      baseObjectName: baseObjectName,
    },

    {
      $set: {
        versionCurrent: newVersion,
        objectType: objectType,
      },
    },

    { upsert: true },
  );
}
