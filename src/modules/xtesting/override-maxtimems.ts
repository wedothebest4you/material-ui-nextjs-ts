import readLine from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017', {
  timeoutMS: 0,
});

const rl = readLine.createInterface({ input, output });

async function dbConnectAndFind() {
  await client.connect();
  while (true) {
    const result = await client.db('test').collection('test').find().toArray();
    console.log(result);
    const ans = await rl.question('Enter to retrieve again, x to exit');
    if (ans == 'x') process.exit(0);
  }
}

dbConnectAndFind();

db.adminCommand(
   {
      setClusterParameter: {
         defaultMaxTimeMS: { readOperations: 5000 }
      }
   }