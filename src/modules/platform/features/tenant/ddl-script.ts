import TENANT_JSONSCHEMA from './jsonschema';
import TENANT_QUERY_VALIDATION from './query-validation';
import TENANT from './constants';
import { getDbByMongoDbClient } from '@/shared/index';

async function createDBObjects() {
  const db = await getDbByMongoDbClient();

  await db.createCollection(TENANT.collectionName, {
    validator: {
      $and: [
        {
          $expr: TENANT_QUERY_VALIDATION,
        },
        {
          $jsonschema: TENANT_JSONSCHEMA,
        },
      ],
    },
  });

  const coll = db.collection(TENANT.collectionName);

  await coll.createIndexes([
    {
      key: { code: 1 },
      unique: true,
      name: 'u_teant_code',
    },
    {
      key: { name: 1 },
      unique: true,
      name: 'u_tenant_name',
    },
  ]);

  await db.createCollection('tenatsList', {
    viewOn: TENANT.collectionName, // The source collection
    pipeline: [
      {
        $project: {
          name: 1,
          code: 1,
          plan: 1,
          status: 1,
          userLimit: 1,
        },
      },
    ],
  });
}

createDBObjects();
