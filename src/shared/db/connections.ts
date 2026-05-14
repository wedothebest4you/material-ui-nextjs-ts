import mongoose, { Mongoose } from 'mongoose';
import env from '@/env';

type Cached = {
  conn: Mongoose | null;
};

let cached: Cached = { conn: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose.connect(env.MONGODB_URI);
  cached.conn.set('debug', env.ENV === 'development' ? true : false);
  cached.conn.set('autoIndex', false);
  cached.conn.set('autoCreate', false);
  cached.conn.set('strict', 'throw');
  return cached.conn;
}
