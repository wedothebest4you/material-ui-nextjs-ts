import { MongoClient } from 'mongodb';
import env from '@/env';

export default async function getDbByMongoDbClient() {
  const client = new MongoClient(env.DB_BASE_URI);

  return (await client.connect()).db(env.DB_NAME);
}
