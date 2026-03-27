import mongoose, { InferSchemaType, model, Types } from 'mongoose';

export interface IAccountTemplate {
  id: string;
  name: string;
  code: string;
  category: String;
  parentId?: Types.ObjectId;
  path: string;
  level: number;
  accType: string;
  isDeleted?: boolean;
  deletedAt?: Date;
}

const AccountTemplateSchema = new mongoose.Schema<IAccountTemplate>(
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

    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

AccountTemplateSchema.index({ code: 1 });

export const AccountTemplate =
  (mongoose.models.AccountTemplate as mongoose.Model<IAccountTemplate>) ||
  mongoose.model<IAccountTemplate>('AccountTemplate', AccountTemplateSchema);
