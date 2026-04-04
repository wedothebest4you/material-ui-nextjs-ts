const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();

  const db = client.db('test');
  const col = db.collection('test_upsert');

  const tasks = [];

  for (let i = 0; i < 500; i++) {
    tasks.push(
      col.updateOne({ key: 'k', a: i }, { $inc: { a: 1 } }, { upsert: true }),
    );
  }
  await col.deleteMany();
  await Promise.all(tasks);

  const docs = await col.find({}).sort().toArray();

  console.log('Documents inserted:', docs.length);
  console.log(docs);

  await client.close();
}

run();
