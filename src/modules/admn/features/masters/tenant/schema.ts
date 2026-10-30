const planEnum = [
  { description: 'A. basic - 25 users', userLimit: 25, planId: 'A' },
  { description: 'B. standard - 100 users', userLimit: 50, planId: 'B' },
  {
    description: 'C. enterprise - Unlimited users',
    userLimit: 100,
    planId: 'C',
  },
] as const;

export const planDescriptionEum = planEnum.map((i) => i.description) as [
  'A. basic - 25 users',
];

export const userLimitEnum = planEnum.map((i) => i.userLimit); //[25, 50, 100] as const;
export const planIdEnum = planEnum.map((i) => i.planId);
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
  planId: {
    required: 'Plan Id is required',
    enum: {
      value: planIdEnum,
      message: `incorrect. The allowed values are [${planIdEnum.join(arrayJoinChars)}]`,
    },
  },
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
