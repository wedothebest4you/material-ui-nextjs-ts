import mongoose from 'mongoose';
import TENANT from '../schema';
import tenantSchema, { TenantSchemaType } from './mg_schema';
import { MakeModel, MakeHydratedDocument } from '@/shared/index';
import { loadClassCustom } from '@/shared/index';
import { TenantClass } from './class';

type combinedModel = MakeModel<TenantSchemaType, typeof TenantClass>;

loadClassCustom(TenantClass, tenantSchema);

const Tenant = mongoose.model<any, combinedModel>(
  TENANT.viewName,
  tenantSchema,
);

export default Tenant;
