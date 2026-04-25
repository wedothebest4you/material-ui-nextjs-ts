import { Db, AppJSONSchema } from '../types';
import createOrModifyCollections from '../createOrModifyCollections';
import getBaseSchemaObject from '../getBaseSchemaObject';
import createIndexes from '../createIndexes';

export default async function (db: Db) {
  const collectionName = 'tenants';

  const baseSchemaObject = getBaseSchemaObject('tenants', 'v1');

  const schemaVersions: AppJSONSchema = {
    bsonType: 'object',
    required: ['_id', 'name', 'code', 'plan', 'status', 'createdAt', 'version'],
    properties: {
      _id: {
        bsonType: 'objectId',
        description: 'Primary Identifier',
      },

      name: {
        bsonType: 'string',
        description: 'Tenant name',
        maxLength: 60,
      },

      code: {
        bsonType: 'string',
        description: 'Unique tenant code',
        maxLength: 30,
      },

      plan: {
        bsonType: 'string',
        description: 'Subscription Plan',
        enum: ['basic', 'standard', 'enterprise'],
      },

      status: {
        bsonType: 'string',
        description: 'Tenant Status',
        enum: ['active', 'inactive'],
      },

      createdAt: {
        bsonType: 'date',
        description: 'Creation Date',
      },

      updatedAt: {
        bsonType: ['date', 'null'],
        description: 'Last Updated Date',
      },

      deletedAt: {
        bsonType: ['date', 'null'],
        description: 'Soft Delete Timestamp',
      },

      version: {
        bsonType: 'int',
        description: 'Document Version',
        enum: [1],
      },

      createdBy: {
        bsonType: ['objectId', 'null'],
        description: 'Created By User',
      },

      updatedBy: {
        bsonType: ['objectId', 'null'],
        description: 'Updated By User',
      },

      userLimit: {
        bsonType: ['int', 'null'],
        description: 'Maximum Allowed Users',
        minimum: 1,
        maximum: 100000,
      },

      storageQuotaMb: {
        bsonType: ['int', 'null'],
        description: 'Storage Quota (MB)',
        minimum: 100,
        maximum: 1000000,
      },
    },
  };

  await createOrModifyCollections(
    db,
    collectionName,
    baseSchemaObject,
    schemaVersions,
  );

  await createIndexes(db, {
    collection: collectionName,
    indexName: 'ux_tenant_code',
    version: 'v1',
    keys: { code: 1 },
    options: {
      unique: true,
    },
  });

  await createIndexes(db, {
    collection: collectionName,
    indexName: 'ux_tenant_name',
    version: 'v1',
    keys: { name: 1 },
    options: {
      unique: true,
    },
  });
}
