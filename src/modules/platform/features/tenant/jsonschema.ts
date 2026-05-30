import { AppJSONSchema } from '@/shared/types/index';
import TENANT from './constants';

const TENANT_JSONSCHEMA = {
  bsonType: 'object',
  title: 'Tenant object validation',
  required: [
    'name',
    'code',
    'plan',
    'status',
    'userLimit',
    '_v',
    'createdAt',
    'updatedAt',
  ],
  properties: {
    name: {
      bsonType: 'string',
      maxLength: 30,
      description: `${TENANT.name.required}\n${TENANT.name.maxLength}`,
    },

    code: {
      bsonType: 'string',
      description: `${TENANT.code.required}\n${TENANT.code.maxLength}`,
      maxLength: 15,
    },

    plan: {
      bsonType: 'string',
      enum: TENANT.plan.enum,
      description: `${TENANT.plan.required}`,
    },

    status: {
      bsonType: 'string',
      description: `${TENANT.status.required}`,
      enum: TENANT.status.enum,
    },

    userLimit: {
      bsonType: 'int',
      description: `${TENANT.userLimit.required}`,
      enum: TENANT.userLimit.enum,
    },
    _v: {
      bsonType: 'int',
      description: `${TENANT._v.required}`,
    },
    createdAt: {
      bsonType: 'date',
      description: `${TENANT.createdAt.required}`,
    },
    updatedAt: {
      bsonType: ['date', 'null'],
      description: `${TENANT.createdAt.required}`,
    },
  },
} as const satisfies AppJSONSchema;

export default TENANT_JSONSCHEMA;
