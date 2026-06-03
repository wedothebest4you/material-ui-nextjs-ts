import { HydratedDocument } from 'mongoose';

export default class EntityBase {
  async onPostSave(error: Error, doc: any, next: any) {
    console.log(`From base class ${doc}`);
    next(error);
  }
}
