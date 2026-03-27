'use server';

import { IAccountTemplate, AccountTemplate } from '../model/account-template';
import { connectDB } from '@/shared/db/connections';

export async function getAccountTemplates() {
  await connectDB();

  // const data = AccountTemplate.find({ isDeleted: false })
  //   .sort({ code: 1 })
  //   .lean({ getters: true });
  const data = await AccountTemplate.aggregate<IAccountTemplate>([
    { $match: { isDeleted: false } },
    {
      $project: {
        id: { $toString: '$_id' },
        _id: 0,
        code: 1,
        name: 1,
        category: 1,
        parentId: 1,
        path: 1,
        level: 1,
        accType: 1,
        isDeleted: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    { $sort: { code: 1 } },
  ]);
  return data;
}

export async function createAccountTemplate(data: IAccountTemplate) {
  await connectDB();

  let parentId = undefined;
  let parent = undefined;
  let level = 0;
  let path = data.code;
  // if parent group has selected, the add the new entry as its child
  // by setting the relation as below.
  if (data.parentId) {
    parentId = data.parentId;
    parent = data.parentId && (await AccountTemplate.findById(data.parentId));
    level = parent!.level + 1;
    path = `${parent!.path}.${data.code}`;
  }

  // console.log(createAccountTemplate.name);
  // console.log('New template');
  // console.log(rec);

  const rec = new AccountTemplate<IAccountTemplate>({
    ...data,
    parentId,
    path,
    level,
  });

  await rec.save();
  //Implement this
  //share.google/aimode/M5AEkhGKPZnKK7ggw
  https: return data;
}

export async function updateAccountTemplate(id: string, data: any) {
  await connectDB();

  data.parentId ||= null;

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
