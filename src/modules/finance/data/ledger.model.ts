/**
 * Ledger mongoose schema.
 * Owned fully by finance module.
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
