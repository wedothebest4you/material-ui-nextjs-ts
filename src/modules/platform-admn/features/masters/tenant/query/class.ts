import {
  MakeQueryWithHelpersFind,
  MakeQueryWithHelpersFindOne,
  MakeHydratedDocument,
  OverrideType,
  SchemaSortDocument,
  FieldOperator,
  SchemaFilterQuery,
  SchemaProjection,
  QueryBase,
} from '@/src/shared';

import TENANT from '../constants';
import Tenant from './model';
import { TenantSchemaType } from './schema';

type TenantModel = typeof Tenant;

type TenantDocument = MakeHydratedDocument<
  TenantSchemaType,
  typeof TenantClass
>;

type TenantQueryWithHelpersFind = MakeQueryWithHelpersFind<
  TenantSchemaType,
  typeof TenantClass
>;
type TenantQueryWithHelpersFindOne = MakeQueryWithHelpersFindOne<
  TenantSchemaType,
  typeof TenantClass
>;

export class TenantClass extends QueryBase {
  async byActiveTenants(this: TenantQueryWithHelpersFind) {
    const filter: SchemaFilterQuery<TenantSchemaType> = {
      status: TENANT.status.enum.value[0],
    };
    const projection: SchemaProjection<TenantSchemaType> = {
      name: 1,
      code: 1,
      plan: 1,
      userLimit: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
    };
    const sort: SchemaSortDocument<TenantSchemaType> = { name: 1 };

    const query = Tenant.findOne(filter);
    query.projection(projection);
    query.sort(sort);

    return await query.exec();
  }
}
