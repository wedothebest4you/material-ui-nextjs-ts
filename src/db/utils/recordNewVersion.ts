import { Db, ObjectVersionDocument, VersionParams, INDEX } from '../types';

export default async function recordObjectVersion(
  db: Db,
  params: VersionParams,
): Promise<void> {
  const { objectName, objectType, version, baseObjectName } = params;

  console.log(`Updating object version ${version}`);

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
        versionCurrent: version,
        objectType: objectType,
      },

      $push: {
        revisions: version,
      },
    },

    { upsert: true },
  );
}
