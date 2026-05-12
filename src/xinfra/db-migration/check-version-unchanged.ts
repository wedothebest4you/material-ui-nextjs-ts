import { ObjectVersionDocument } from './types';

export default function checkVersionUnchanged(
  newVersion: number,
  Currentversion: ObjectVersionDocument | null,
) {
  if (Currentversion) {
    if (newVersion === Currentversion.versionCurrent) return true;
  }
  return false;
}
