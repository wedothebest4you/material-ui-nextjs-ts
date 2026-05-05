import {
  Db,
  DBMigrationItem,
  hasSchema,
  hasCreateIndexParameters,
} from './types';
import createOrModifyCollections from './create-modify-coll';
import getBaseSchemaObject from './get-base-schema-obj';
import createIndexes from './create-indexes';

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
  if (hasCreateIndexParameters(item.indexes)) {
    await createIndexes(db, item.collectionName, item.indexes);
  }
}
