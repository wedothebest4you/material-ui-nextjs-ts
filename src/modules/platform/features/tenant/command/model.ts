import mongoose, { HydratedDocument } from 'mongoose';
import TENANT from '../constants';
import { tenantSchema, TenantSchemaType } from './schema';
import { MakeModel } from '@/shared/index';
import { loadClassCustom } from '@/shared/index';
import { TenantClass } from './class';

type combinedModel = MakeModel<TenantSchemaType, typeof TenantClass>;

loadClassCustom(TenantClass, tenantSchema);

const Tenant = mongoose.model<any, combinedModel>(
  TENANT.collectionName,
  tenantSchema,
);

export default Tenant;
