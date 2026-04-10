import type { Db, SchemaValidation, ObjectVersionDocument } from '../types';

export default async function ensureCollection(
  db: Db,
  name: string,
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
  const newVersion = versionDef.enum[0];

  const versionRecord = await db
    .collection<ObjectVersionDocument>('object_version')
    .findOne({ _id: name, objectType: 'col' });

  if (versionRecord) {
    const versionExists = versionRecord.revisions.find((r) => r === newVersion);
    if (versionExists) {
      throw new Error(
        `Schema version '${newVersion}' already exists for '${name}'.`,
      );
    }
  }

  const collExists = (await db.listCollections({ name }).toArray()).length > 0;

  if (!collExists) {
    console.log(`Creating collection ${name}`);

    await db.createCollection(name, schemaValidation);

    await recordObjectVersion(db, name, newVersion);

    return;
  }

  const result = await db.command({
    collMod: name,

    validator: schemaValidation.validator,

    validationLevel: schemaValidation.validationLevel ?? 'strict',

    validationAction: schemaValidation.validationAction ?? 'error',
  });

  if (!result.ok) {
    throw new Error(`collMod failed for ${name}`);
  }

  await recordObjectVersion(db, name, 'col', newVersion);
}

export async function recordObjectVersion(
  db: Db,
  objectName: string,
  objectType: 'col' | 'ind',
  version: string,
): Promise<void> {
  console.log(`Updating object version ${version}`);

  const objectVersions =
    db.collection<ObjectVersionDocument>('object_versions');

  await objectVersions.updateOne(
    { objectName: objectName, objectType: objectType },

    {
      $set: {
        versionCurrent: version,
        objectType: objectType,
      },

      $push: {
        revisions: version,
      },
    },

    { upsert: true },
  );
}
