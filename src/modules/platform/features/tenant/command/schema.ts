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
    required: [true, TENANT.code.required],
    maxLength: [15, TENANT.code.maxLength],
  },
  plan: {
    type: String,
    required: [true, TENANT.plan.required],
    enum: TENANT.plan.enum,
  },
  status: {
    type: String,
    required: [true, TENANT.status.required],
    enum: TENANT.status.enum,
    default: 'active',
  },
  userLimit: {
    type: Number,
    required: [true, TENANT.userLimit.required],
    enum: TENANT.userLimit.enum,
  },
} satisfies SchemaDefinition;

export const tenantSchema = createCommandSchema(schemaObject);

type tenantSchemaType = InferSchemaType<typeof tenantSchema>;

export type TenantSchemaType = Omit<
  tenantSchemaType,
  'createdAt' | 'updatedAt'
>;
