const ensureCollection = require('../utils/ensureCollection');
const ensureIndex = require('../utils/ensureIndex');

module.exports = async function (db) {
  await ensureCollection(db, 'tenants', {
    validator: {
      $jsonSchema: {
        title: 'Tenant',
        bsonType: 'object',
        additionalProperties: false,
        required: [
          '_id',
          'name',
          'code',
          'plan',
          'status',
          'createdAt',
          'version',
        ],
        properties: {
          version: {
            bsonType: 'string',
            enum: ['v1'], // only latest allowed
          },
          _id: {
            bsonType: 'objectId',
            title: 'Primary Identifier',
          },

          name: {
            bsonType: 'string',
            title: 'Tenant Name',
            description: 'Tenant name',
            maxLength: 60,
          },

          code: {
            bsonType: 'string',
            title: 'Tenant Code',
            description: 'Unique tenant code',
            maxLength: 30,
          },

          plan: {
            bsonType: 'string',
            title: 'Subscription Plan',
            enum: ['basic', 'standard', 'enterprise'],
          },

          status: {
            bsonType: 'string',
            title: 'Tenant Status',
            enum: ['active', 'inactive'],
          },

          createdAt: {
            bsonType: 'date',
            title: 'Creation Date',
          },

          updatedAt: {
            bsonType: ['date', 'null'],
            title: 'Last Updated Date',
          },

          deletedAt: {
            bsonType: ['date', 'null'],
            title: 'Soft Delete Timestamp',
          },

          createdBy: {
            bsonType: ['objectId', 'null'],
            title: 'Created By User',
          },

          updatedBy: {
            bsonType: ['objectId', 'null'],
            title: 'Updated By User',
          },

          userLimit: {
            bsonType: ['int', 'null'],
            title: 'Maximum Allowed Users',
            minimum: 1,
            maximum: 999,
          },

          storageQuotaMb: {
            bsonType: ['int', 'null'],
            title: 'Storage Quota (MB)',
            minimum: 100,
            maximum: 1000000,
          },
        },
      },
    },
    validationLevel: 'strict',
    validationAction: 'error',
  });

  const col = db.collection('business_entities');

  await ensureIndex(col, { code: 1 }, { unique: true });

  await ensureIndex(col, { name: 'text' });
};
