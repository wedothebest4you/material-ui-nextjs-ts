// import Tenant from './model';
import { TenantDTO, tenantDTO, TenantKeys } from './zod_schema';
import { TenantSchemaType } from './mg_schema';
import { type ActionState } from '@/src/shared';
// import ServiceBase from '@/src/shared/mongoose/service-base-class';

// export default class TenantService extends ServiceBase {
export default class TenantService {
  static async createOrUpdateTenant(
    tenantInput: unknown,
  ): Promise<ActionState<TenantKeys>> {
    // if (!(tenant instanceof FormData)) {
    //   throw ServiceBase.customError.createCustomError(
    //     400,
    //     'Invalid input',
    //     'The form input conatains invalid data',
    //   );
    //   // throw Error('Invalid formData');
    // }
    // const rawData = Object.fromEntries(tenant.entries());
    const cleanData = tenantDTO.safeParse(tenantInput);
    if (!cleanData.success) {
      const fieldErrors: Partial<Record<TenantKeys, string>> = {};
      for (const issue of cleanData.error.issues) {
        const name = issue.path[0] as TenantKeys;
        fieldErrors[name] = issue.message;
      }
      return { status: 'error', fieldErrors };
    }
    return { status: 'success' };
  }
}
