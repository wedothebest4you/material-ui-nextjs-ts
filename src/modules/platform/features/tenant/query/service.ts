import Tenant from './model';

export default class TenantQuery {
  static async getFullList() {
    const doc = await Tenant.find().lean();
    return doc;
  }
}
