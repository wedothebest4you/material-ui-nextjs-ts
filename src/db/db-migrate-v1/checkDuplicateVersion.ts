import { Db, DBObjectVersionInfo } from './types';
import getObjectVersionColl from './getObjectVersionColl';

export default async function checkDuplicateVersion(
  db: Db,
  params: DBObjectVersionInfo,
) {
  const { objectName, version, baseObjectName } = params;
  const objectVersions = await getObjectVersionColl(db);

  const versionRecord = await objectVersions.findOne({
    objectName: objectName,
    baseObjectName: baseObjectName,
  });

  if (versionRecord) {
    const versionExists = versionRecord.revisions.find((r) => r === version);
    if (versionExists) {
      throw new Error(
        `The New Index version '${version}' already exists for the object '${objectName}'.`,
      );
    }
  }
}
