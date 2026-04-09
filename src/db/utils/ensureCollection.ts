import type { Db, SchemaValidation, SchemaVersionDocument } from '../types';

export default async function ensureCollection(
  db: Db,
  name: string,
  schemaValidation: SchemaValidation,
): Promise<void> {
  try {
    const newVersion = extractSchemaVersion(schemaValidation);

    await validateSchemaVersion(db, name, newVersion);

    /*
    Check collection existence
    */

    const exists = (await db.listCollections({ name }).toArray()).length > 0;

    const schemaVersions =
      db.collection<SchemaVersionDocument>('schema_versions');

    const versionDoc = await schemaVersions.findOne({ collection: name });

    /*
    Create collection if not present
    */

    if (!exists) {
      console.log(`Creating collection ${name}`);

      await db.createCollection(name, schemaValidation);

      await recordSchemaVersion(db, name, newVersion);

      return;
    }

    /*
    Validate schema version record
    */

    if (!versionDoc) {
      throw new Error(`Missing schema version entry for ${name}`);
    }

    const currentVersion = versionDoc.versionCurrent;

    /*
    Skip if already at latest version
    */

    if (currentVersion === newVersion) {
      console.log(`Collection ${name} already at version ${newVersion}`);

      return;
    }

    /*
    Update validator
    */

    const result = await db.command({
      collMod: name,

      validator: schemaValidation.validator,

      validationLevel: schemaValidation.validationLevel ?? 'strict',

      validationAction: schemaValidation.validationAction ?? 'error',
    });

    if (!result.ok) {
      throw new Error(`collMod failed for ${name}`);
    }

    /*
    Record schema version
    */

    await recordSchemaVersion(db, name, newVersion);

    console.log(`Updated ${name} → schema version ${newVersion}`);
  } catch (err: unknown) {
    // console.error('\x1b[31mMIGRATION FAILED:\x1b[0m', name);
    // if (err instanceof Error) console.error(err.message);
    // else console.error(err);
    // process.exit(1);
  }
}

function extractSchemaVersion(schemaValidation: SchemaValidation): string {
  const { version } = schemaValidation.validator.$jsonSchema.properties;

  if (version.enum.length !== 1)
    throw new Error('Version enum must contain exactly one value');

  return version.enum[0];
}

export async function validateSchemaVersion(
  db: Db,
  collectionName: string,
  newVersion: string,
): Promise<void> {
  const schemaVersions =
    db.collection<SchemaVersionDocument>('schema_versions');

  const exists = await db
    .listCollections({ name: 'schema_versions' }, { nameOnly: true })
    .hasNext();

  if (!exists) {
    throw new Error(
      'schema_versions collection not found. ' +
        'Run the dictionary migration before schema migrations.',
    );
  }

  const doc = await schemaVersions.findOne({ _id: collectionName });

  /*
  First migration for this collection
  */

  if (!doc) return;

  /*
  Prevent duplicate schema version
  */

  const alreadyExists = doc.revisions.some((r) => r === newVersion);

  if (alreadyExists) {
    throw new Error(
      `Schema version ${newVersion} already recorded for ${collectionName}`,
    );
  }
}

export async function recordSchemaVersion(
  db: Db,
  collectionName: string,
  version: string,
): Promise<void> {
  const schemaVersions =
    db.collection<SchemaVersionDocument>('schema_versions');

  await schemaVersions.updateOne(
    { _id: collectionName },

    {
      $set: {
        versionCurrent: version,
      },

      $push: {
        revisions: version,
      },
    },

    { upsert: true },
  );
}
