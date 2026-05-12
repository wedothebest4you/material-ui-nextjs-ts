import { ObjectVersionDocument } from './types';

export default async function checkVersionMissing(
  newVersion: number,
  Currentversion: ObjectVersionDocument | null,
) {
  if (Currentversion) {
    if (newVersion - Currentversion.versionCurrent !== 1)
      throw new Error(
        `Version missing in the object ${Currentversion.objectName}, new version : ${newVersion}, old version : ${versionRecord.versionCurrent}`,
      );
  }
}
