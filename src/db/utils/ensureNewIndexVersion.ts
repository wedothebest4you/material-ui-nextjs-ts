import { Db, ObjectType } from '../types';
import getObjectVersionColl from './getObjectVersionColl';

export default async function ensureNewIndexVersion(
  db: Db,
  objectName: string,
  objectType: ObjectType,
  baseObjectName: string,
  newVersion: string,
) {
  const objectVersions = await getObjectVersionColl(db);

  const versionRecord = await objectVersions.findOne({
    objectName: objectName,
    baseObjectName: baseObjectName,
  });

  if (versionRecord) {
    const versionExists = versionRecord.revisions.find((r) => r === newVersion);
    if (versionExists) {
      throw new Error(
        `The New Index version '${newVersion}' already exists for the object '${objectName}'.`,
      );
    }
  }
}
