import Tenant from './model';
import { TenantDTO, tenantDTO } from './dto';
import { TenantSchemaType } from './schema';

export default class TenantService {
  static async createOrUpdateTenant(tenant: unknown) {
    let rawData = null;

    if (tenant instanceof FormData) {
      const rawData = Object.fromEntries(tenant.entries());
    }
    const cleanData = tenantDTO.parse(rawData);
    return Tenant.createOrUpdateTenant(cleanData);
  }
}
