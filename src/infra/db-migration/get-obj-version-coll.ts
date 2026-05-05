const OBJECT_VERSIONS_COLLECTION = 'object_versions';
import { Db, ObjectVersionDocument } from './types';

export default async function getObjectVersionColl(db: Db) {
  const versionHistory = db.collection<ObjectVersionDocument>(
    OBJECT_VERSIONS_COLLECTION,
  );
  if (!versionHistory) {
    throw new Error(
      `The docitionary collection ${OBJECT_VERSIONS_COLLECTION} does not exists`,
    );
  }
  return versionHistory;
}
