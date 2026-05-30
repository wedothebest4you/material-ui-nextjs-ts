import mongoose from 'mongoose';
import TENANT from '../constants';
import { tenantSchema, TenantSchemaType } from './schema';
import { TenantClass } from './class';
import { MakeModel } from '@/shared/index';

tenantSchema.loadClass(TenantClass);

type combinedModel = MakeModel<TenantSchemaType, typeof TenantClass>;

const Tenant = mongoose.model<any, combinedModel>(
  TENANT.collectionName,
  tenantSchema,
);

export default Tenant;
