import { AppJSONSchema } from '@/shared/types/index';

const TENANT_JSONSCHEMA = {
  bsonType: 'object',
  title: 'tenant',
  required: ['name', 'code', 'plan', 'status', 'createdAt'],
  properties: {
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
      maximum: 100,
    },
  },
} as const satisfies AppJSONSchema;

export default TENANT_JSONSCHEMA;
