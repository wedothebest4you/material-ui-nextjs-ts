import Tenant from './model';
import { TenantDTO } from './dto';
import { SortOrder } from 'mongoose';
import CustomError from '@/shared/errors/custom-error';

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
  static async createTenant(tenant: TenantDTO) {
    const tenantDoc = new Tenant(tenant);
    return await tenantDoc.saveTenant();
  }
  // static async listTenants() {
  //   const queryFilter: SchemaawareFilterQuery<TenantSchemaType> = {
  //     status: 'active',
  //   };
  //   const projection: SchemaawareProjection<TenantSchemaType> = { code: 1 };
  //   const sort: SchemaawareSortDocument<TenantSchemaType> = { code: 1 };
  //   const query = Tenant.findOne({
  //     $where: { name: 'xz' },
  //   });
  //   query.projection(projection);
  //   query.sort(sort);
  //   return await query;
  // }

  // static async findTenant(tenantId: string) {
  //   return await Tenant.findById(tenantId);
  // }
  static async updateTenat(tenant: TenantDTO) {
    const doc = await Tenant.find().byTenantId(tenant.id);
    if (doc) {
      doc.name = tenant.name;
      doc.save();
    } else {
      throw CustomError.createCustmError(
        500,
        'Retrieval failed',
        `Retrieval failed for id ${tenant.id}`,
      );
    }
  }

  static async deactivateTenat(tenatDTO: TenantDTO) {}
}
