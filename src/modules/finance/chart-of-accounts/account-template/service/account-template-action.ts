'use server';

import { AccountTemplate } from '../model/account-template';
import { connectDB } from '@/shared/db/connections';

export async function getAccountTemplates() {
  await connectDB();

  // const data = AccountTemplate.find({ isDeleted: false })
  //   .sort({ code: 1 })
  //   .lean({ getters: true });
  const data = AccountTemplate.aggregate([
    { $match: { isDeleted: false } },
    {
      $project: {
        _id: { $toString: '$_id' },
        name: 1,
        type: 1,
        parentId: 1,
        path: 1,
        level: 1,
        isGroup: 1,
        isDeleted: 1,
        createdAt: 1,
        updatedAt: 1,
        __v: 1,
      },
    },
    { $sort: { code: 1 } },
  ]);
  return data;
}

export async function createAccountTemplate(data: any) {
  await connectDB();

  let parent = null;

  if (data.parentId) parent = await AccountTemplate.findById(data.parentId);

  const level = parent ? parent.level + 1 : 0;

  const path = parent ? `${parent.path}.${data.code}` : data.code;
  const rec = {
    ...data,
    parentId: data.isGroup ? null : data.parentId,
    level,
    path,
  };
  console.log(createAccountTemplate.name);
  console.log('New template');
  console.log(rec);
  return AccountTemplate.create(rec);
}

export async function updateAccountTemplate(id: string, data: any) {
  await connectDB();

  return AccountTemplate.findByIdAndUpdate(id, data, { new: true });
}

export async function softDeleteAccountTemplate(id: string) {
  await connectDB();

  const children = await AccountTemplate.find({
    parentId: id,
    isDeleted: false,
  });

  if (children.length > 0) throw new Error('Delete children first');

  return AccountTemplate.findByIdAndUpdate(
    id,

    {
      isDeleted: true,
      deletedAt: new Date(),
    },

    { new: true },
  );
}

export async function restoreAccountTemplate(id: string) {
  await connectDB();

  return AccountTemplate.findByIdAndUpdate(
    id,

    {
      isDeleted: false,
      deletedAt: null,
    },

    { new: true },
  );
}
