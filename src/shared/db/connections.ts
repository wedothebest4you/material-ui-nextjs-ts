import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI!;

const MONGODB_URI = 'mongodb://127.0.0.1:27017/erp';

if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');

let cached: mongoose.Connection = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

//TODO
// var __setOptions = cached.Query.prototype.setOptions;

// mongoose.Query.prototype.setOptions = function (options, overwrite) {
//   __setOptions.apply(this, arguments);
//   if (this.options.lean == null) this.options.lean = true;
//   return this;
// };

// https://stackoverflow.com/questions/19183886/mongoose-is-there-a-way-to-default-lean-to-true-always-on

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}
