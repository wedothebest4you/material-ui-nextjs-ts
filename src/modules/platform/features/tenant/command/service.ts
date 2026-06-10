import Tenant from './model';
import { TenantDTO } from './dto';

export default class TenantService {
  static async createTenant(tenant: TenantDTO) {
    return Tenant.createTenant(tenant);
  }

  static async listTenants() {}

  static async updateTenat(tenant: TenantDTO) {
    return Tenant.updateTenant(tenant);
  }
}
