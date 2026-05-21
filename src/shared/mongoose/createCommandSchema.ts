import { AnyObject, Schema, SchemaDefinition } from 'mongoose';

export default function createCommandSchema<
  Definition extends SchemaDefinition = SchemaDefinition,
>(definition: Definition, options = {}) {
  return new Schema(
    { ...definition },
    {
      optimisticConcurrency: true,
      timestamps: true,
      ...options,
    },
  );
}
