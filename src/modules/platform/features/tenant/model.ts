import mongoose from 'mongoose';
import { COLLECTION_NAME } from './constants';

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      // unique: true,
      maxlength: 30,
    },
    plan: {
      type: String,
      required: true,
      enum: ['basic', 'standard', 'enterprise'],
      default: 'basic',
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    userLimit: {
      type: Number, // Mongoose uses Number for int
      min: 1,
      max: 100,
    },
    storageQuotaMb: {
      type: Number,
      min: 100,
      max: 1000000,
    },
  },
  {
    // Automatically handles 'createdAt' as per your required list
    timestamps: true,
  },
);

// Explicitly naming the model 'Tenant'
const Tenant = mongoose.model(COLLECTION_NAME, tenantSchema);

export default Tenant;
