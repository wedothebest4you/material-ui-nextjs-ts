import { InferSchemaType, SchemaDefinition } from 'mongoose';
import { createQuerySchema } from '@/shared/index';

const schemaObject = {
  name: String,
  code: String,
  plan: String,
  status: String,
  userLimit: Number,
  createdAt: Date,
  updatedAt: Date,
} satisfies SchemaDefinition;

const tenantSchema = createQuerySchema(schemaObject);

export default tenantSchema;

export type TenantSchemaType = InferSchemaType<typeof tenantSchema>;
