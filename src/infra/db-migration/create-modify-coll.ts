import {
  Db,
  ComposedValidator,
  CreateCollectionOptionsExtended,
  COLLECTION,
  BaseJSONSchema,
  AppJSONSchema,
} from './types';
import checkDuplicateVersion from './check-dup-version';
import recordObjectVersion from './record-new-ver';

export default async function createOrModifyCollections(
  db: Db,
  objectName: string,
  baseJSONSchema: BaseJSONSchema,
  appJSONSchema: AppJSONSchema,
): Promise<void> {
  const composedValidator: ComposedValidator = {
    $jsonSchema: {
      allOf: [baseJSONSchema, appJSONSchema],
    },
  };

  const createCollectionOptions: Omit<
    CreateCollectionOptionsExtended,
    'migrationVersion'
  > = {
    validator: composedValidator,
  };
  console.log(`🔍 Ensuring collection - ${objectName}`);

  const versionDef =
    createCollectionOptions.validator.$jsonSchema.allOf[0].properties.version;
  if (!versionDef || versionDef.bsonType !== 'int' || !versionDef.enum) {
    throw new Error('Schema must define version enum of type integer');
  }

  if (versionDef.enum.length !== 1) {
    throw new Error('Version enum must contain only one version - the latest');
  }

  const version = versionDef.enum[0];

  await checkDuplicateVersion(db, {
    objectName,
    objectType: COLLECTION,
    version,
  });

  const collExists =
    (await db.listCollections({ name: objectName }).toArray()).length > 0;

  if (!collExists) {
    console.log(`Creating collection ${objectName}`);

    await db.createCollection(objectName, createCollectionOptions);
  } else {
    const result = await db.command({
      collMod: objectName,
      validator: createCollectionOptions.validator,
      validationLevel: createCollectionOptions.validationLevel ?? 'strict',
      validationAction: createCollectionOptions.validationAction ?? 'error',
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
