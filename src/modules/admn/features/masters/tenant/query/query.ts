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

import TENANT from '../schema';
import Tenant from './model';
import { TenantSchemaType } from './mg_schema';
// import { connection } from 'next/server';
import { cacheLife, cacheTag } from 'next/cache';

// type TenantModel = typeof Tenant;

// type TenantDocument = MakeHydratedDocument<
//   TenantSchemaType,
//   typeof TenantClass
// >;

// type TenantQueryWithHelpersFind = MakeQueryWithHelpersFind<
//   TenantSchemaType,
//   typeof TenantClass
// >;
// type TenantQueryWithHelpersFindOne = MakeQueryWithHelpersFindOne<
//   TenantSchemaType,
//   typeof TenantClass
// >;

// import { byActiveTenantsCached } from './cache';
import CacheTimeStamped from './cache_timestamp';

export async function byActiveTenants() {
  'use cache';
  cacheTag(TENANT.queryViewName);
  cacheLife('days');

  const filter: SchemaFilterQuery<TenantSchemaType> = {
    status: TENANT.status.enum.value[0],
  };
  const projection: SchemaProjection<TenantSchemaType> = {
    id: 1,
    name: 1,
    code: 1,
    plan: 1,
    userLimit: 1,
    status: 1,
    createdAt: 1,
    updatedAt: 1,
  };
  const sort: SchemaSortDocument<TenantSchemaType> = { name: 1 };

  const query = Tenant.find(filter).lean();
  query.projection(projection);
  query.sort(sort);
  const doc = await query.exec();
  console.log('doc', doc);
  return CacheTimeStamped(doc);
}
