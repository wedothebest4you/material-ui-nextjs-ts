import {
  Db,
  ComposedValidator,
  CreateCollectionOptions,
  COLLECTION,
  BaseJSONSchema,
  AppJSONSchema,
} from './types';
import checkDuplicateVersion from './checkDuplicateVersion';
import recordObjectVersion from './recordNewVersion';

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

  const createCollectionOptions: CreateCollectionOptions = {
    validator: composedValidator,
  };
  console.log(`🔍 Ensuring collection - ${objectName}`);

  const versionDef =
    createCollectionOptions.validator.$jsonSchema.allOf[0].properties.version;
  if (!versionDef || !versionDef.enum) {
    throw new Error('Schema must define version enum');
  }

  if (versionDef.enum.length !== 1) {
    throw new Error('Version enum must contain only latest version');
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
