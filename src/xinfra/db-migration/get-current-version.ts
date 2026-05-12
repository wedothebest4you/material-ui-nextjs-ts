import { Db, DBObjectVersionInfo } from './types';
import getObjectVersionColl from './get-obj-version-coll';

export default async function getCurrentVersion(
  db: Db,
  params: DBObjectVersionInfo,
) {
  const { objectName, baseObjectName } = params;
  const objectVersions = await getObjectVersionColl(db);

  const versionRecord = await objectVersions.findOne({
    objectName: objectName,
    baseObjectName: baseObjectName,
  });

  return versionRecord;
}
