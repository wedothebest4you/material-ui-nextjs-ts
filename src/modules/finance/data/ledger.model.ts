/**
 * Ledger mongoose schema.
 * Owned fully by finance module.
 */

/*

ToDo:
The _id field in not serializable when it is passed from a
server component to client components. Therefore the virtual getter id
provided by mongoose would be the required equivalent. However, this getter
will be skipped when lean method is performed in find. Therefore it is also not available. 

At present, the the _id has been
converted into a string while it is passsed across the rendering boundary.
This may need to revisit to make more efficient.

*/

import mongoose, { Schema, InferSchemaType, models, model } from 'mongoose';

const LedgerSchema = new Schema(
  {
    orgId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

LedgerSchema.index({ orgId: 1, code: 1 }, { unique: true });

export type LedgerDocument = InferSchemaType<typeof LedgerSchema>;

export const LedgerModel = models.Ledger || model('Ledger', LedgerSchema);
