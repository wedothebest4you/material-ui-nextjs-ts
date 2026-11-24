import { Label } from '@mui/icons-material';
import { keyof } from 'zod';

export const userLimitEnum = [25, 50, 'unlimited'] as const;
export const planEnum = ['Basic', 'Standard', 'Enterprise'] as const;
const statusEnum = ['Active', 'Disabled'] as const;

export const plan = [
  { value: planEnum[0], userLimit: userLimitEnum[0] },
  { value: planEnum[1], userLimit: userLimitEnum[1] },
  { value: planEnum[2], userLimit: userLimitEnum[2] },
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
} as const;

const arrayJoinChars = ', ';

const TENANT = {
  modelName: 'Tenant',
  collectionName: 'tenants',
  viewName: 'tenantsList',
  name: {
    label: 'Name',
    required: 'Tenant Name is required',
    maxLength: 'exceeds 30 characters',
    helpText: '30 chars.',
    length: 30,
  },
  code: {
    label: 'Code',
    required: 'Tenant Code is required.',
    maxLength: 'exceeds 15 characters',
    helpText: '15 chars.',
    length: 15,
  },
  plan: {
    label: 'Plan',
    required: 'Plan is required',
    enum: {
      value: planEnum,
      message: `incorrect. The allowed values  are  [${planEnum.join(arrayJoinChars)}]`,
    },
  },
  status: {
    label: 'Status',
    required: 'Status is required',
    enum: {
      value: statusEnum,
      message: `incorrect. The allowed values are - [${statusEnum.join(arrayJoinChars)}]`,
    },
  },
  userLimit: {
    label: 'Users',
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
type TENANTLabel = typeof TENANT;
