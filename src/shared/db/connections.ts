import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI!;

const MONGODB_URI = 'mongodb://127.0.0.1:27017/erp';

if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');

let cached: any = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}
