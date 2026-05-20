import mongoose from 'mongoose';
import { COLLECTION_VIEW } from '../constants';
import { tenantSchemaPropsObj, TenantSchemaPropstype } from './props';

const Tenant = mongoose.model<TenantSchemaPropstype>(
  COLLECTION_VIEW,
  tenantSchemaPropsObj,
  COLLECTION_VIEW,
);

export default Tenant;
