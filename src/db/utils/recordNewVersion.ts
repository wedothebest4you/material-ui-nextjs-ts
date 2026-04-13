import { Db, ObjectVersionDocument, ObjectType } from '../types';

export default async function recordObjectVersion(
  db: Db,
  objectName: string,
  objectType: ObjectType,
  version: string,
  baseObjectName = '',
): Promise<void> {
  console.log(`Updating object version ${version}`);

  if (objectType === 'col' && !baseObjectName) {
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
