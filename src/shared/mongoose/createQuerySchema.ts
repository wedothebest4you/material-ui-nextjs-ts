import { Schema, SchemaDefinition } from 'mongoose';

export default function createQuerySchema<
  Definition extends SchemaDefinition = SchemaDefinition,
>(definition: Definition, options = {}) {
  return new Schema(
    { ...definition },
    // spot to add reusable schema fragments
    {
      // optimisticConcurrency: true,
      // timestamps: true,
      ...options,
    },
  );
}
