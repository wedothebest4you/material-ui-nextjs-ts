import { MigrationItemDefinition, AppJSONSchema } from '../types';

const tenants: AppJSONSchema = {
  bsonType: 'object',
  title: 'tenant',
  version: 1,
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

export const migrationItem: MigrationItemDefinition = {
  collectionName: 'tenants',
  collectionDescription: {
    createOrModifyCollectionOptions: {
      validator: tenants,
    },
  },
  createIndexesParameters: {
    indexSpecs: [
      {
        migrationVersion: 1,
        key: { code: 1 },
        unique: true,
      },
      {
        migrationVersion: 2,
        key: { name: 1 },
        unique: true,
      },
    ],
  },
};
