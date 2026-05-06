export default function getVersionJSONSchema(version: number) {
  const versionJSONSchema = {
    bsonType: 'object',
    properties: {
      version: {
        bsonType: 'int',
        description: 'Version number',
        enum: [version],
      },
    },
    required: ['version'],
  };
  return versionJSONSchema;
}
