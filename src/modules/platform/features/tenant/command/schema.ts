import { InferSchemaType, SchemaDefinition } from 'mongoose';
import { createCommandSchema } from '@/shared/index';
import TENANT from '../constants';

const schemaObject = {
  name: {
    type: String,
    trim: true,
    required: [true, TENANT.name.required],
    maxLength: [30, TENANT.code.required],
  },
  code: {
    type: String,
    trim: true,
    uppercase: true,
    required: [true, TENANT.code.required],
    maxLength: [15, TENANT.code.maxLength],
  },
  plan: {
    type: String,
    required: [true, TENANT.plan.required],
    enum: {
      values: TENANT.plan.enum.value,
      message: TENANT.plan.enum.message,
    },
  },
  status: {
    type: String,
    required: [true, TENANT.status.required],
    enum: {
      values: TENANT.status.enum.value,
      message: TENANT.status.enum.message,
    },
    default: 'active',
  },
  userLimit: {
    type: Number,
    required: [true, TENANT.userLimit.required],
    enum: {
      values: TENANT.userLimit.enum.value,
      message: TENANT.userLimit.enum.message,
    },
  },
} satisfies SchemaDefinition;

const tenantSchema = createCommandSchema(schemaObject);

export default tenantSchema;

export type TenantSchemaType = InferSchemaType<typeof tenantSchema>;
