connection.js;
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

async function connectDB() {
  const client = new MongoClient(uri);

  await client.connect();

  const db = client.db(process.env.DB_NAME);

  return { client, db };
}

module.exports = connectDB;
