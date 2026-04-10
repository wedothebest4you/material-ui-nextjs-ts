import type { Db, SchemaVersionDocument } from '../types';

export async function validateVersion(db: Db) {
  const schemaVersions =
    db.collection<SchemaVersionDocument>('schema_versions');

  const versionDoc = await schemaVersions.findOne({ collection: name });
  const newVersion = extractSchemaVersion(schemaValidation);

  if (versionDoc) {
    const alreadyExists = versionDoc.revisions.some((r) => r === newVersion);

    if (alreadyExists) {
      throw new Error(
        `Schema version ${newVersion} already recorded for ${name}`,
      );
    }
  }
}
