import { byActiveTenants } from './query';

export default class TenantService {
  static async getActiveTenants() {
    try {
      const tenants = await byActiveTenants();
      console.log('tenants', tenants);
      return tenants;
    } catch (err) {
      throw err;
    }
  }
}
