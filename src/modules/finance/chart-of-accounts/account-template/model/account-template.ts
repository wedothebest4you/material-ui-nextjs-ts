import mongoose, { InferSchemaType, model } from 'mongoose';

const AccountTemplateSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ['asset', 'liability', 'equity', 'revenue', 'expense'],
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AccountTemplate',
    },

    path: {
      type: String,
      required: true,
      index: true,
    },

    level: { type: Number, required: true },

    accType: {
      type: String,
      enum: ['ledger', 'group'],
      required: true,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },

    deletedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

AccountTemplateSchema.index({ code: 1 });

export type AccountTemplateDocumnent = InferSchemaType<
  typeof AccountTemplateSchema
> & { id: string };

export const AccountTemplate =
  (mongoose.models
    .AccountTemplate as mongoose.Model<AccountTemplateDocumnent>) ||
  mongoose.model<AccountTemplateDocumnent>(
    'AccountTemplate',
    AccountTemplateSchema,
  );
