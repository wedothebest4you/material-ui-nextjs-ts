/**
 * Ledger business logic.
 * No UI, no platform imports.
 */

import { connectDB } from '@/shared/db/connections';
import { LedgerModel } from '../data/ledger.model';
import mongoose from 'mongoose';

export interface CreateLedgerInput {
  orgId: string;
  name: string;
  code: string;
}

export async function listLedgers(orgId: string) {
  await connectDB();

  return LedgerModel.find({
    orgId,
    isActive: true,
  })
    .sort({ createdAt: -1 })
    .lean();
}

export async function createLedger(input: CreateLedgerInput) {
  await connectDB();

  const exists = await LedgerModel.findOne({
    orgId: input.orgId,
    code: input.code,
  });

  if (exists) {
    throw new Error('Ledger code already exists');
  }

  const ledger = await LedgerModel.create(input);

  return ledger.toObject();
}

export async function updateLedger(input: {
  id: string;
  orgId: string;
  name: string;
  code: string;
}) {
  await connectDB();

  const ledger = await LedgerModel.findOne({
    _id: new mongoose.Types.ObjectId(input.id),
    orgId: input.orgId,
  });

  if (!ledger) {
    throw new Error('Ledger not found');
  }

  ledger.name = input.name;
  ledger.code = input.code;

  await ledger.save();

  return ledger.toObject();
}

export async function deleteLedger(input: { id: string; orgId: string }) {
  await connectDB();

  await LedgerModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(input.id),
      orgId: input.orgId,
    },
    {
      isActive: false,
    },
  );
}
