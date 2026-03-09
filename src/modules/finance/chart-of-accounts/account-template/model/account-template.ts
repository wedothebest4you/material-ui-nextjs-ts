// To bring in the field id field in all lean find,
// the following plug-in has been used
//https://plugins.mongoosejs.io/plugins/lean-getters

import mongoose from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

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

AccountTemplateSchema.plugin(mongooseLeanGetters);

AccountTemplateSchema.index({ code: 1 });

export const AccountTemplate =
  mongoose.models.AccountTemplate ||
  mongoose.model('AccountTemplate', AccountTemplateSchema);
