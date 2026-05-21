import { TenantSchemaType } from './schema';
import Tenant from './model';

export default class TenantCommand {
  static async createTenant(tenantProps: TenantSchemaType) {
    const tenantDoc = new Tenant(tenantProps);
    return await tenantDoc.save();
  }

  static async updateTenat(tenatProps: TenantSchemaType) {}
  static async deleteTenat(tenatProps: TenantSchemaType) {}
}
