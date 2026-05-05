import { Db, DBObjectVersionInfo } from './types';
import getObjectVersionColl from './get-obj-version-coll';

export default async function checkDuplicateVersion(
  db: Db,
  params: DBObjectVersionInfo,
) {
  const { objectName, version, baseObjectName } = params;
  const objectVersions = await getObjectVersionColl(db);

  const versionRecord = await objectVersions.findOne({
    objectName: objectName,
    baseObjectName: baseObjectName,
    versionCurrent: version,
  });

  if (versionRecord) {
    throw new Error(
      `The New Index version '${version}' already exists for the object '${objectName}'.`,
    );
  }
}
