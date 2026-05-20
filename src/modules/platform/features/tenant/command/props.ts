import { InferSchemaType } from 'mongoose';
import { createCommandSchema } from '@/shared/index';

const schemaObject = {
  name: {
    type: String,
    required: true,
    maxlength: 60,
    trim: true,
    uppercase: true,
  },
  code: {
    type: String,
    required: true,
    maxlength: 30,
    uppercase: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ['basic', 'standard', 'enterprise'],
    default: 'basic',
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  userLimit: {
    type: Number, // Mongoose uses Number for int
    min: 1,
    max: 100,
  },
};

export const tenantSchemaPropsObj = createCommandSchema(schemaObject);

export type TenantSchemaPropstype = InferSchemaType<
  typeof tenantSchemaPropsObj
>;
