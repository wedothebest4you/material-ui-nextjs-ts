import { AnyObject, Schema, SchemaDefinition } from 'mongoose';

export default function createCommandSchema<
  Definition extends SchemaDefinition = SchemaDefinition,
>(definition: Definition, options = {}) {
  return new Schema(
    { ...definition },
    {
      //this setting is very vital since the CRUD apps, leverages the same.
      optimisticConcurrency: true,
      timestamps: true,
      ...options,
    },
  );
}
