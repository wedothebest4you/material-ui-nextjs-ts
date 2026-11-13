import {
  InferSchemaType,
  SchemaDefinition,
  SchemaDefinitionProperty,
  InferRawDocType,
  Schema,
} from 'mongoose';
import { createCommandSchema } from '@/shared/index';
import TENANT from '../schema';

const schemaObject = {
  name: {
    type: String,
    // trim: true,
    required: true,
    validate: {
      validator: () => {},
      message: '',
    },
  },
  code: {
    type: String,
    // trim: true,
    // uppercase: true,
    required: true, //[true, TENANT.code.required],
    // maxLength: [15, TENANT.code.maxLength],
  },
  plan: {
    type: String,
    required: true, // [true, TENANT.plan.required],
    enum: {
      values: TENANT.plan.enum.value,
      // message: TENANT.plan.enum.message,
    },
  },
  status: {
    type: String,
    required: true, // [true, TENANT.status.required],
    enum: {
      values: TENANT.status.enum.value,
      // message: TENANT.status.enum.message,
    },
    // default: 'active',
  },
  userLimit: {
    type: String,
    required: true, // [true, TENANT.userLimit.required],
    enum: {
      values: TENANT.userLimit.enum.value,
      // message: TENANT.userLimit.enum.message,
    },
  },
};

const tenantSchema = new Schema({
  name: {
    type: String,
    // trim: true,
    required: true,
    validate: {
      validator: () => {},
      message: '',
    },
  },
  code: {
    type: String,
    // trim: true,
    // uppercase: true,
    required: true, //[true, TENANT.code.required],
    // maxLength: [15, TENANT.code.maxLength],
  },
  plan: {
    type: String,
    required: true, // [true, TENANT.plan.required],
    enum: {
      values: TENANT.plan.enum.value,
      // message: TENANT.plan.enum.message,
    },
  },
  status: {
    type: String,
    required: true, // [true, TENANT.status.required],
    enum: {
      values: TENANT.status.enum.value,
      // message: TENANT.status.enum.message,
    },
    // default: 'active',
  },
  userLimit: {
    type: String,
    required: true, // [true, TENANT.userLimit.required],
    enum: {
      values: TENANT.userLimit.enum.value,
      // message: TENANT.userLimit.enum.message,
    },
  },
});

type RawUserDocument = InferRawDocType<typeof tenantSchema>;

export default tenantSchema;

export type TenantSchemaType = InferSchemaType<typeof tenantSchema>;
