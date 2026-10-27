const planEnum = [
  'A. basic - 25 users',
  'B. standard - 100 users',
  'C. enterprise - Unlimited users',
] as const;

const statusEnum = ['active', 'inactive'] as const;

export const userLimitEnum = [25, 100, 0] as const;

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
      value: userLimitEnum,
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
