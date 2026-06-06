import { TenantSchemaType } from './schema';
import Tenant from './model';

import { SortOrder } from 'mongoose';

type SchemaawareSortDocument<T> = Partial<
  Record<Extract<keyof T, string>, SortOrder>
>;

type FieldOperator<T> = {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $in?: T[];
};

type SchemaawareFilterQuery<T> = {
  [K in keyof T]?: T[K] | FieldOperator<T[K]>;
};

type SchemaawareProjection<T> = Partial<Record<keyof T, 1 | 0 | true | false>>;

export default class TenantCommand {
  static async createTenant(tenantProps: TenantSchemaType) {
    const tenantDoc = new Tenant(tenantProps);
    return await tenantDoc.save();
  }
  static async listTenants() {
    const queryFilter: SchemaawareFilterQuery<TenantSchemaType> = {
      status: 'active',
    };
    const projection: SchemaawareProjection<TenantSchemaType> = { code: 1 };
    const sort: SchemaawareSortDocument<TenantSchemaType> = { code: 1 };
    const query = Tenant.findOne({
      $where: { name: 'xz' },
    });
    query.projection(projection);
    query.sort(sort);
    return await query;
  }

  static async findTenant(tenantId: string) {
    return await Tenant.findById(tenantId);
  }
  static async updateTenat(tenatProps: TenantSchemaType) {}
  static async deleteTenat(tenatProps: TenantSchemaType) {}
}
