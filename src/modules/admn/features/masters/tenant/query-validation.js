"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TENANT_QUERY_VALIDATION = {
    $expr: {
        $cond: {
            if: {
                $eg: ['$_v', 0],
            },
        },
        then: { $eg: [{ $type: '$updatedAt' }, 'null'] },
        else: {
            $eg: [{ $type: '$updatedAt' }, 'date'],
        },
    },
};
exports.default = TENANT_QUERY_VALIDATION;
