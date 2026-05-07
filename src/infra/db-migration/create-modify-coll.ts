import {
  Db,
  CreateOrModifyCollectionOptionsDTOIn,
  CreateOrModifyCollectionOptions,
  ComposedJSONSchema,
  COLLECTION,
} from './types';
import checkDuplicateVersion from './check-dup-version';
import recordObjectVersion from './record-new-ver';
import getVersionJSONSchema from './get-version-json-schema';
import getAuditJSONSchema from './get-audit-json-schema';

export default async function createOrModifyCollections(
  db: Db,
  objectName: string,
  optionsDTOIn: CreateOrModifyCollectionOptionsDTOIn,
): Promise<void> {
  const newVersion =
    optionsDTOIn.createOrModifyCollectionOptions.validator.version;
  if (typeof newVersion !== 'number') {
    throw new Error('Schema must define version type number');
  }

  await checkDuplicateVersion(db, {
    objectName,
    objectType: COLLECTION,
    newVersion,
  });

  const appSchema = {
    ...optionsDTOIn.createOrModifyCollectionOptions.validator,
  };
  const versionSchema = getVersionJSONSchema(newVersion);
  const auditSchema = getAuditJSONSchema();

  const composedJSONSchema: ComposedJSONSchema = {
    $jsonSchema: {
      allOf: [appSchema, versionSchema, auditSchema],
    },
  };
  const options: CreateOrModifyCollectionOptions = {
    ...optionsDTOIn,
    createOrModifyCollectionOptions: {
      ...optionsDTOIn.createOrModifyCollectionOptions,
      validator: composedJSONSchema,
    },
  };

  const collExists =
    (await db.listCollections({ name: objectName }).toArray()).length > 0;

  if (!collExists) {
    console.log(`Creating collection ${objectName}`);

    await db.createCollection(
      objectName,
      options.createOrModifyCollectionOptions,
    );
  } else {
    const result = await db.command(
      {
        collMod: objectName,
        ...options.createOrModifyCollectionOptions,
      },
      options.commandOptions,
    );

    if (!result.ok) {
      throw new Error(`collMod failed for ${objectName}`);
    }
  }

  await recordObjectVersion(db, {
    objectName: objectName,
    objectType: COLLECTION,
    newVersion,
  });
}
