import type { Db, SchemaValidation } from '../types';
import ensureNewCollVersion from './ensureNewCollVersion';
import recordObjectVersion from './recordNewVersion';

export default async function ensureCollection(
  db: Db,
  name: string,
  schemaValidation: SchemaValidation,
): Promise<void> {
  const OBJECT_TYPE = 'col';

  console.log(`🔍 Ensuring collection - ${name}`);

  const versionDef = schemaValidation.validator.$jsonSchema.properties.version;

  if (!versionDef || !versionDef.enum) {
    throw new Error('Schema must define version enum');
  }

  if (versionDef.enum.length !== 1) {
    throw new Error('Version enum must contain only latest version');
  }
  const newVersion = versionDef.enum[0];

  ensureNewCollVersion(db, name, newVersion);

  const collExists = (await db.listCollections({ name }).toArray()).length > 0;

  if (!collExists) {
    console.log(`Creating collection ${name}`);

    await db.createCollection(name, schemaValidation);
  } else {
    const result = await db.command({
      collMod: name,

      validator: schemaValidation.validator,

      validationLevel: schemaValidation.validationLevel ?? 'strict',

      validationAction: schemaValidation.validationAction ?? 'error',
    });

    if (!result.ok) {
      throw new Error(`collMod failed for ${name}`);
    }
  }

  await recordObjectVersion(db, name, OBJECT_TYPE, newVersion);
}
