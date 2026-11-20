"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planEnum = exports.userLimitEnum = exports.planEnumLabels = exports.plan = void 0;
exports.plan = [
    { value: 'Basic', userLimit: 25 },
    {
        value: 'Standard',
        userLimit: 50,
    },
    {
        value: 'Enterprise',
        userLimit: 'unlimited',
    },
];
exports.planEnumLabels = {
    value: {
        title: 'Description',
        width: '70%',
    },
    userLimit: {
        title: 'Users Limit',
        width: '30%',
    },
};
exports.userLimitEnum = exports.plan.map(function (i) { return i.userLimit; }); //[25, 50, 100] as const;
exports.planEnum = exports.plan.map(function (i) { return i.value; });
var statusEnum = ['Active', 'Disabled'];
var arrayJoinChars = ', ';
var TENANT = {
    collectionName: 'Tenant',
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
            value: exports.planEnum,
            message: "incorrect. The allowed values  are  [".concat(exports.planEnum.join(arrayJoinChars), "]"),
        },
    },
    status: {
        required: 'Status is required',
        enum: {
            value: statusEnum,
            message: "incorrect. The allowed values are - [".concat(statusEnum.join(arrayJoinChars), "]"),
        },
    },
    userLimit: {
        required: 'User Limit is required',
        enum: {
            value: exports.userLimitEnum,
            message: "incorrect. The allowed values are - [".concat(exports.userLimitEnum.join(arrayJoinChars), "]"),
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
};
exports.default = TENANT;
