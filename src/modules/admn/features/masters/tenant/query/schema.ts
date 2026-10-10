import { InferSchemaType, SchemaDefinition } from 'mongoose';
import { createQuerySchema } from '@/shared/index';

const schemaObject = {
  name: { type: String, required: true },
  code: { type: String, required: true },
  plan: { type: String, required: true },
  status: { type: String, required: true },
  userLimit: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
} satisfies SchemaDefinition;

const tenantSchema = createQuerySchema(schemaObject);

export default tenantSchema;

export type TenantSchemaType = InferSchemaType<typeof tenantSchema>;
