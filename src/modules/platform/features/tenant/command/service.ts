import { TenantSchemaPropstype } from './props';
import Tenant from './model';

export default class TenantCommand {
  static async createTenant(tenantProps: TenantSchemaPropstype) {
    const tenantDoc = new Tenant(tenantProps);
    return await tenantDoc.save();
  }

  static async updateTenat(tenatProps: TenantSchemaPropstype) {}
  static async deleteTenat(tenatProps: TenantSchemaPropstype) {}
}
