// import { BaseJSONSchema } from './types';

export default function getAuditJSONSchema() {
  // const baseSchemaObject: BaseJSONSchema = {
  const auditJSONSchema = {
    bsonType: 'object',
    properties: {
      createdAt: {
        bsonType: 'date',
        description: 'Created on date',
      },
      updatedAt: {
        bsonType: ['date', 'null'],
        description: 'Updated on date',
      },
      deletedAt: {
        bsonType: ['date', 'null'],
        description: 'Deleted on date',
      },
      delFlag: {
        bsonType: ['null', 'string'],
        description: 'Updated on date',
        enum: ['x'],
      },
      createdBy: {
        bsonType: ['string'],
        description: 'Created By User',
      },
      updatedBy: {
        bsonType: ['string', 'null'],
        description: 'Updated By User',
      },
      deletedBy: {
        bsonType: ['string', 'null'],
        description: 'Updated By User',
      },
    },
    required: ['createdAt', 'createdBy'],
  };
  return auditJSONSchema;
}
