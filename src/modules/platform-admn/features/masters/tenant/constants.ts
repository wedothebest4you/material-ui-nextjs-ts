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
    maxLength: '{VALUE} exceeds 30 characters',
  },
  code: {
    required: 'Tenant Code is required.',
    maxLength: '{VALUE} exceeds 15 characters',
  },
  plan: {
    required: 'Plan is required',
    enum: {
      value: planEnum,
      message: `{VALUE} is incorrect. The allowed values  are  [${planEnum.join(arrayJoinChars)}]`,
    },
  },
  status: {
    required: 'Status is required',
    enum: {
      value: statusEnum,
      message: `{VALUE} is incorrect. The allowed values are - [${statusEnum.join(arrayJoinChars)}]`,
    },
  },
  userLimit: {
    required: 'User Limit is required',
    enum: {
      value: userLimitEnum,
      message: `{VALUE} is incorrect. The allowed values are - [${userLimitEnum.join(arrayJoinChars)}]`,
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
