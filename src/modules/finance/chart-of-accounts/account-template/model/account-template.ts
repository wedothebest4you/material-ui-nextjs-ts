import mongoose from 'mongoose';

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

    type: {
      type: String,
      enum: ['asset', 'liability', 'equity', 'revenue', 'expense'],
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AccountTemplate',
    },

    path: {
      type: String,
      index: true,
    },

    level: Number,

    isGroup: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

AccountTemplateSchema.index({ code: 1 });

export const AccountTemplate =
  mongoose.models.AccountTemplate ||
  mongoose.model('AccountTemplate', AccountTemplateSchema);
