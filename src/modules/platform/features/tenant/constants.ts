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
    maxLength: 'Tenant Name is limited to 30 characters',
  },
  code: {
    required: 'Tenant Code is required.',
    maxLength: 'Tenant Code is limited to 15 characters',
  },
  plan: {
    required: `Allowed values for plan are - [${planEnum.join(arrayJoinChars)}]`,
    enum: planEnum,
  },

  status: {
    required: `Allowed values for status are - [${statusEnum.join(arrayJoinChars)}]`,
    enum: statusEnum,
  },
  userLimit: {
    required: `Allowed values for userLimit are - [${userLimitEnum.join(arrayJoinChars)}]`,
    enum: userLimitEnum,
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
