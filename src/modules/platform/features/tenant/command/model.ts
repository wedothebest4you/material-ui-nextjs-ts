import mongoose from 'mongoose';
import { COLLECTION_NAME } from '../constants';
import { tenantSchemaPropsObj } from './props';
import TenantSchemaMethods from './methods';

tenantSchemaPropsObj.loadClass(TenantSchemaMethods);

const Tenant = mongoose.model(COLLECTION_NAME, tenantSchemaPropsObj);

export default Tenant;
