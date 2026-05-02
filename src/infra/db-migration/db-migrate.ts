import { Db, DBMigrationItem, hasSchema, hasIndexes } from './types';
import createOrModifyCollections from './createOrModifyCollections';
import getBaseSchemaObject from './getBaseSchemaObject';
import createIndexes from './createIndexes';

export default async function dbMigrate(db: Db, item: DBMigrationItem) {
  if (hasSchema(item.schema)) {
    const baseSchemaObject = getBaseSchemaObject(
      item.schema.title,
      item.schema.version,
    );
    await createOrModifyCollections(
      db,
      item.collectionName,
      baseSchemaObject,
      item.schema.JSONschema,
    );
  }
  if (hasIndexes(item.indexes)) {
    await createIndexes(db, item.collectionName, item.indexes);
  }
}
