import { plan } from '../schema';
import { TenantDTO } from './zod_schema';

import {
  InferSchemaType,
  SchemaDefinition,
  SchemaDefinitionProperty,
  InferRawDocType,
  Schema,
} from 'mongoose';
import { createCommandSchema } from '@/shared/index';
import TENANT from '../schema';
import { validate } from 'zod';

const schemaObject = {
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
    enum: {
      values: TENANT.plan.enum.value,
    },
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: TENANT.status.enum.value,
    },
  },
  userLimit: {
    type: Schema.Types.Union,
    of: [
      { type: Number, enum: [25, 50] },
      { type: String, enum: ['unlimited'] },
    ],
    required: true,
  },
};
console.log('4 re/creating schema object');
const tenantSchema = createCommandSchema(schemaObject);

export default tenantSchema;

export type TenantSchemaType = InferSchemaType<typeof tenantSchema>;
