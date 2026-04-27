import { BaseJSONSchema } from './types';

export default function getBaseSchemaObject(title: string, version: string) {
  const baseSchemaObject: BaseJSONSchema = {
    bsonType: 'object',
    title: title,
    properties: {
      version: {
        bsonType: 'string',
        description: 'Latest schema version',
        enum: [version],
      },
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
        bsonType: ['null', 'x'],
        description: 'Updated on date',
      },
    },
    required: ['version', 'createdAt'],
    additionalProperties: false,
  };
  return baseSchemaObject;
}
