import TENANT_JSONSCHEMA from './jsonschema';
import { COLLECTION_NAME } from './constants';
import { getDbByMongoDbClient } from '@/shared/index';

async function createDBObjects() {
  const db = await getDbByMongoDbClient();

  await db.createCollection(COLLECTION_NAME, {
    validator: TENANT_JSONSCHEMA,
  });

  const coll = db.collection(COLLECTION_NAME);

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
    viewOn: COLLECTION_NAME, // The source collection
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
