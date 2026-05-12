import TENANT_JSONSCHEMA from './jsonschema';
import { COLLECTION_NAME } from './constants';
import { connectDB } from '@/shared/db/connections';

async function createDBObjects() {
  const db = await connectDB();

  await db.createCollection(COLLECTION_NAME, {
    validator: TENANT_JSONSCHEMA,
  });

  const coll = db.collection(COLLECTION_NAME);

  await coll.createIndexes({
    indexSpecs: [
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
    ],
  });
}

createDBObjects();
