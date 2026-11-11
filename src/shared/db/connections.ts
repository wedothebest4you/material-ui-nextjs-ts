import mongoose, { Mongoose } from 'mongoose';
import env from '@/env';
import { SERVER_SELECTION_TIMEOUT_MS, SOCKET_TIMEOUT_MS } from './constants';

type Cached = {
  conn: Mongoose | null;
};

let cached: Cached = { conn: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  // dbName key has been used to make the connection params
  // more close to the same with MongoClient
  // citation : https://mongoosejs.com/docs/connections.html#options

  cached.conn = await mongoose.connect(`mongodb://127.0.0.1:27017`, {
    dbName: `erp`,
    serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
    socketTimeoutMS: SOCKET_TIMEOUT_MS,
  });
  cached.conn.set('debug', env.ENV === 'development' ? true : false);
  cached.conn.set('autoIndex', false);
  cached.conn.set('autoCreate', false);
  cached.conn.set('strict', 'throw');
  cached.conn.set('strictQuery', 'throw');
  cached.conn.set('toJSON', { getters: true, virtuals: true });
  cached.conn.set('toObject', { getters: true, virtuals: true });

  return cached.conn;
}
