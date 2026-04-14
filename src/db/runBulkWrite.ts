import {
  MongoClient,
  AnyBulkWriteOperation,
  MongoBulkWriteError,
} from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
interface TestDoc {
  _id: object;
  key1: string;
}
async function runBulkWrite() {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('testdb');
    const coll = db.collection<TestDoc>('test');
    await coll.drop();
    await coll.createIndex({ key1: 1 }, { unique: true });
    const insertOperation: AnyBulkWriteOperation<TestDoc>[] = [
      { insertOne: { document: { key1: '1' } } },
      { insertOne: { document: { key1: '1' } } },
      { insertOne: { document: { key1: '2' } } },
      { insertOne: { document: { key1: '3' } } },
      { insertOne: { document: { key1: '2' } } },
    ];
    await coll.bulkWrite(insertOperation, {
      ordered: false,
    });
  } catch (err: unknown) {
    if (err instanceof MongoBulkWriteError && Array.isArray(err.writeErrors)) {
      console.log('The failed documents with Ids');
      console.log(err.writeErrors[0].err.op);
      console.log(err.writeErrors[1].err.op);
    }
  }
}
runBulkWrite();
