import { MongoClient } from 'mongodb';
// import env from '@/env';

export default async function getDbByMongoDbClient() {
  //  const client = new MongoClient(env.DB_BASE_URI);
  const client = new MongoClient(`mongodb://127.0.0.1:27017`);

  // return (await client.connect()).db(env.DB_NAME);
  return (await client.connect()).db('erp');
}
