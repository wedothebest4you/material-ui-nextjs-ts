import mongoose, { Model } from 'mongoose';
import { COLLECTION_NAME } from '../constants';
import { tenantSchema, TenantSchemaType } from './schema';
import { TenantClass } from './class';
import { MakeModel } from '@/shared/index';

tenantSchema.loadClass(TenantClass);

type combinedModel = MakeModel<TenantSchemaType, typeof TenantClass>;

const Tenant = mongoose.model<any, combinedModel>(
  COLLECTION_NAME,
  tenantSchema,
);

export default Tenant;
