export const planEnum = [
  { description: 'Basic', userLimit: 25, id: 'A' },
  {
    description: 'Standard',
    userLimit: 50,
    id: 'B',
  },
  {
    description: 'Enterprise',
    userLimit: 'unlimited',
    id: 'C',
  },
] as const;

export const userLimitEnum = planEnum.map((i) => i.userLimit); //[25, 50, 100] as const;
export const planIdEnum = planEnum.map((i) => i.id);
const statusEnum = ['Active', 'Disabled'] as const;

const arrayJoinChars = ', ';

const TENANT = {
  collectionName: 'Tenant',
  viewName: 'tenantsList',
  name: {
    required: 'Tenant Name is required',
    maxLength: 'exceeds 30 characters',
    helpText: '30 chars.',
  },
  code: {
    required: 'Tenant Code is required.',
    maxLength: 'exceeds 15 characters',
    helpText: '15 chars.',
  },
  plan: {
    required: 'Plan is required',
    enum: {
      value: planEnum,
      message: `incorrect. The allowed values  are  [${planEnum.join(arrayJoinChars)}]`,
    },
  },
  // planId: {
  //   required: 'Plan Id is required',
  //   enum: {
  //     value: planIdEnum,
  //     message: `incorrect. The allowed values are [${planIdEnum.join(arrayJoinChars)}]`,
  //   },
  // },
  status: {
    required: 'Status is required',
    enum: {
      value: statusEnum,
      message: `incorrect. The allowed values are - [${statusEnum.join(arrayJoinChars)}]`,
    },
  },
  userLimit: {
    required: 'User Limit is required',
    enum: {
      value: planEnum.map((i) => i.userLimit),
      message: `incorrect. The allowed values are - [${userLimitEnum.join(arrayJoinChars)}]`,
    },
  },
  _v: {
    required: 'Version is required',
  },
  createdAt: {
    required: 'Created at is required',
  },
  updatedAt: {
    required: 'Updated at is required',
  },
} as const;

export default TENANT;
