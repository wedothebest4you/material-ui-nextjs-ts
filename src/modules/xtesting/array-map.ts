import mongoose, { Schema } from 'mongoose';

const DB_BASE_URI = 'mongodb://127.0.0.1:27017',
  DB_NAME = 'erp';

const someSchema = new Schema({
  key1: String,
  arrOfSubDocs: [
    {
      key1: String,
      key2: String,
    },
  ],
  mapOfDocs: {
    type: Map,
    of: String,
  },
});
console.log(someSchema.obj);

const SomeModel = mongoose.model('somecoll', someSchema);
const doc = new SomeModel({
  arrOfSubDocs: [
    {
      key1: '1',
      key2: '2',
    },
    {
      key1: '1.1',
      key2: '2.1',
    },
  ],
  mapOfDocs: {
    key1: '1',
    key2: '2',
    key3: '3',
  },
});
let rec;
// (async () => {
//   await mongoose.connect(DB_BASE_URI + '/' + DB_NAME);
//   rec = await doc.save();
//   console.log(rec);
// })();
// console.log(someSchema.path('arrOfSubDocs'));
