export const plan = [
  { value: 'Basic', userLimit: 25 },
  {
    value: 'Standard',
    userLimit: 50,
  },
  {
    value: 'Enterprise',
    userLimit: 'unlimited',
  },
] as const;

export const planEnumLabels = {
  value: {
    title: 'Description',
    width: '70%',
  },
  userLimit: {
    title: 'Users Limit',
    width: '30%',
  },
};

export const userLimitEnum = plan.map((i) => i.userLimit); //[25, 50, 100] as const;
export const planEnum = plan.map((i) => i.value);
const statusEnum = ['Active', 'Disabled'] as const;

const arrayJoinChars = ', ';

const TENANT = {
  modelName: 'Tenant',
  collectionName: 'tenants',
  viewName: 'tenantsList',
  name: {
    required: 'Tenant Name is required',
    maxLength: 'exceeds 30 characters',
    helpText: '30 chars.',
    length: 30,
  },
  code: {
    required: 'Tenant Code is required.',
    maxLength: 'exceeds 15 characters',
    helpText: '15 chars.',
    length: 15,
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
