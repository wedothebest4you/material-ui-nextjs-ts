import { Db, DBObjectVersionInfo } from './types';
import getObjectVersionColl from './get-obj-version-coll';

export default async function checkDuplicateVersion(
  db: Db,
  params: DBObjectVersionInfo,
) {
  const { objectName, newVersion, baseObjectName } = params;
  const objectVersions = await getObjectVersionColl(db);

  const versionRecord = await objectVersions.findOne({
    objectName: objectName,
    baseObjectName: baseObjectName,
  });

  if (versionRecord) {
    if (newVersion - versionRecord.versionCurrent !== 1)
      throw new Error(
        `Version missing in the object ${objectName}, new version : ${newVersion}, old version : ${versionRecord.versionCurrent}`,
      );
  }
}
