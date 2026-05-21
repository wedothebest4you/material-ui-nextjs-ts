import Tenant from './model';

export default class TenantQuery {
  static async getFullList() {
    return await Tenant.find();
  }
}
