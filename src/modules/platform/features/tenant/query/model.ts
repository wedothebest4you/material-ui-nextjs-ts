import mongoose from 'mongoose';
import { COLLECTION_VIEW } from '../constants';
import { tenantSchema, TenantSchemaType } from './schema';

let Tenant = mongoose.model<TenantSchemaType>(
  COLLECTION_VIEW,
  tenantSchema,
  COLLECTION_VIEW,
);

export default Tenant;
