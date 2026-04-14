import { Db, SchemaValidation, COLLECTION } from '../types';
import checkDuplicateVersion from './checkDuplicateVersion';
import recordObjectVersion from './recordNewVersion';

export default async function createOrModifyCollections(
  db: Db,
  objectName: string,
  schemaValidation: SchemaValidation,
): Promise<void> {
  console.log(`🔍 Ensuring collection - ${name}`);

  const versionDef = schemaValidation.validator.$jsonSchema.properties.version;

  if (!versionDef || !versionDef.enum) {
    throw new Error('Schema must define version enum');
  }

  if (versionDef.enum.length !== 1) {
    throw new Error('Version enum must contain only latest version');
  }
  const version = versionDef.enum[0];

  checkDuplicateVersion(db, {
    objectName,
    objectType: COLLECTION,
    version,
  });

  const collExists =
    (await db.listCollections({ objectName }).toArray()).length > 0;

  if (!collExists) {
    console.log(`Creating collection ${name}`);

    await db.createCollection(objectName, schemaValidation);
  } else {
    const result = await db.command({
      collMod: name,

      validator: schemaValidation.validator,

      validationLevel: schemaValidation.validationLevel ?? 'strict',

      validationAction: schemaValidation.validationAction ?? 'error',
    });

    if (!result.ok) {
      throw new Error(`collMod failed for ${objectName}`);
    }
  }

  await recordObjectVersion(db, {
    objectName: objectName,
    objectType: COLLECTION,
    version: version,
  });
}
