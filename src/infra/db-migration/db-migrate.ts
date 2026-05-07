import { Db, isMigrationDefined } from './types';
import createOrModifyCollections from './create-modify-coll';
import createIndexes from './create-indexes';

export default async function dbMigrate(db: Db, item: unknown) {
  if (!isMigrationDefined(item)) {
    throw new Error(
      `❌ Migration has an invalid item, please check the keys and values,
      'While the key/value for CollectionName is a mandatory, either createCollectionOptions or createIndexesOptions must also be specified.`,
    );
  }
  if (item.collectionDescription) {
    await createOrModifyCollections(
      db,
      item.collectionName,
      item.collectionDescription,
    );
  }
  if (item.createIndexesParameters) {
    await createIndexes(db, item.collectionName, item.createIndexesParameters);
  }
}
