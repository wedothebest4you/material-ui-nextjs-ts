import { InferSchemaType } from 'mongoose';
import { createQuerySchema } from '@/shared/index';

const schemaObject = {
  name: { type: String, required: true },
  code: { type: String, required: true },
  plan: { type: String, required: true },
  status: { type: String, required: true },
  userLimit: { type: Number, required: true },
};

export const tenantSchemaPropsObj = createQuerySchema(schemaObject);

export type TenantSchemaPropstype = InferSchemaType<
  typeof tenantSchemaPropsObj
>;
