import { Db, isMigrationItem, ComposedJSONSchema } from './types';
import createOrModifyCollections from './create-modify-coll';

export default async function dbMigrate(db: Db, item: unknown) {
  if (!isMigrationItem(item)) {
    throw new Error(
      `❌ Migration  has an invalid item, please check the keys and values,
      'While the key/value for CollectionName is a mandatory, either appJSONSchema or createIndexes must also be specified.`,
    );
  }
  if (item.appJSONSchema) {
    await createOrModifyCollections(
      db,
      item.collectionName,
      item.appJSONSchema,
    );
  }
  // }
  // if (hasCreateIndexParameters(item.indexes)) {
  //   await createIndexes(db, item.collectionName, item.indexes);
  // }
}
