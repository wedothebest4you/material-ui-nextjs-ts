import { Db, ObjectVersionDocument, ObjectType } from '../types';
import getObjectVersionColl from './getObjectVersionColl';

export default async function ensureNewCollVersion(
  db: Db,
  objectName: string,
  newVersion: string,
) {
  const objectVersions = await getObjectVersionColl(db);

  const versionRecord = await objectVersions.findOne({
    objectName: objectName,
  });

  if (versionRecord) {
    const versionExists = versionRecord.revisions.find((r) => r === newVersion);
    if (versionExists) {
      throw new Error(
        `The Schema version '${newVersion}' already exists for the object '${objectName}'.`,
      );
    }
  }
}
