import mongoose from 'mongoose';
import TENANT from '../constants';
import { tenantSchema, TenantSchemaType } from './schema';
import { TenantClass } from './class';
import { MakeModel, loadClassCustom } from '@/shared/index';

loadClassCustom(TenantClass, tenantSchema);

type combinedModel = MakeModel<TenantSchemaType, typeof TenantClass>;

const Tenant = mongoose.model<any, combinedModel>(
  TENANT.collectionName,
  tenantSchema,
);

export default Tenant;
