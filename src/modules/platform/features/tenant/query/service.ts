import Tenant from './model';

export default class TenantService {
  static async getActiveTenants() {
    return Tenant.find().byActiveTenants();
  }
}
