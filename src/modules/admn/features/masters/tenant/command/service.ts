import Tenant from './model';
import { TenantDTO, tenantDTO } from './dto';
import { TenantSchemaType } from './schema';
import ServiceBase from '@/src/shared/mongoose/service-base-class';

export default class TenantService extends ServiceBase {
  static async createOrUpdateTenant(tenant: unknown) {
    if (!(tenant instanceof FormData)) {
      throw ServiceBase.customError.createCustomError(
        400,
        'Invalid input',
        'The form input conatains invalid data',
      );
      // throw Error('Invalid formData');
    }
    const rawData = Object.fromEntries(tenant.entries());
    const cleanData = tenantDTO.parse(rawData);
    return Tenant.createOrUpdateTenant(cleanData);
  }
}
