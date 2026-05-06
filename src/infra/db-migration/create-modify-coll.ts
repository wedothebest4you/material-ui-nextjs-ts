import {
  Db,
  CreateOrModifyCollectionOptions,
  COLLECTION,
  BaseJSONSchema,
  AppJSONSchema,
} from './types';
import checkDuplicateVersion from './check-dup-version';
import recordObjectVersion from './record-new-ver';

export default async function createOrModifyCollections(
  db: Db,
  objectName: string,
  createOrModifyCollectionOptions: CreateOrModifyCollectionOptions,
): Promise<void> {
  const version = createOrModifyCollectionOptions.validator.allversion;
  if (typeof version !== 'number') {
    throw new Error('Schema must define version type number');
  }

  await checkDuplicateVersion(db, {
    objectName,
    objectType: COLLECTION,
    version,
  });

  const collExists =
    (await db.listCollections({ name: objectName }).toArray()).length > 0;

  if (!collExists) {
    console.log(`Creating collection ${objectName}`);

    await db.createCollection(objectName, createOrModifyCollectionOptions);
  } else {
    const result = await db.command({
      collMod: objectName,
      ...{ createOrModifyCollectionOptions },
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
