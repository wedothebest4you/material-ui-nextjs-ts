import { InferSchemaType, SchemaDefinition, Schema } from 'mongoose';
import { createQuerySchema } from '@/shared/index';
import TENANT from '../schema';

const schemaObject = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
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
  userLimit: { type: Schema.Types.Union, of: [Number, String], required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
} as const;

const tenantSchema = createQuerySchema(schemaObject);

export default tenantSchema;

export type TenantSchemaType = Exclude<
  InferSchemaType<typeof tenantSchema>,
  'userLimit'
> & {
  userLimit: (typeof TENANT.userLimit.enum.value)[number];
};
// 5
export type tenantKeys = keyof TenantSchemaType;
