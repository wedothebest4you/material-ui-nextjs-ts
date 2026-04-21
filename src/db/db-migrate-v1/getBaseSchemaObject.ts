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
    },
    required: ['version'],
    additionalProperties: false,
  };
  return baseSchemaObject;
}
