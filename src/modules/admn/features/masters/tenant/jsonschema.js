"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var TENANT_JSONSCHEMA = {
    bsonType: 'object',
    title: 'Tenant object validation',
    required: [
        'name',
        'code',
        'plan',
        'status',
        'userLimit',
        '_v',
        'createdAt',
        'updatedAt',
    ],
    properties: {
        name: {
            bsonType: 'string',
            maxLength: schema_1.default.name.length,
            description: "".concat(schema_1.default.name.required, "\n").concat(schema_1.default.name.maxLength),
        },
        code: {
            bsonType: 'string',
            description: "".concat(schema_1.default.code.required, "\n").concat(schema_1.default.code.maxLength),
            maxLength: schema_1.default.code.length,
        },
        plan: {
            bsonType: 'string',
            enum: schema_1.default.plan.enum.value,
            description: "".concat(schema_1.default.plan.required),
        },
        status: {
            bsonType: 'string',
            description: "".concat(schema_1.default.status.required),
            enum: schema_1.default.status.enum.value,
        },
        userLimit: {
            bsonType: 'string',
            description: "".concat(schema_1.default.userLimit.required),
            enum: schema_1.default.userLimit.enum.value,
        },
        _v: {
            bsonType: 'int',
            description: "".concat(schema_1.default._v.required),
        },
        createdAt: {
            bsonType: 'date',
            description: "".concat(schema_1.default.createdAt.required),
        },
        updatedAt: {
            bsonType: ['date', 'null'],
            description: "".concat(schema_1.default.createdAt.required),
        },
    },
};
exports.default = TENANT_JSONSCHEMA;
