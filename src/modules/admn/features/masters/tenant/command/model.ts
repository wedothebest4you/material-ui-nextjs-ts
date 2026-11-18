import mongoose, { HydratedDocument } from 'mongoose';
import TENANT from '../schema';
import tenantSchema, { TenantSchemaType } from './mg_schema';
import { MakeModel, MakeHydratedDocument } from '@/shared/index';
import { loadClassCustom } from '@/shared/index';
import { TenantClass } from './class';

type combinedModel = MakeModel<TenantSchemaType, typeof TenantClass>;

loadClassCustom(TenantClass, tenantSchema);

delete mongoose.models[TENANT.collectionName];
const Tenant = mongoose.model<any, combinedModel>(
  TENANT.collectionName,
  tenantSchema,
);
console.log('model creation runs. 2');
export default Tenant;

// const query = Tenant.find();
// const doc = query.byActiveTenants().exec();
// doc.then((d) => d[0]);
