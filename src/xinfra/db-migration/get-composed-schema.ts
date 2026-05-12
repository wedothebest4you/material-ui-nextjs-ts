import { AppJSONSchema, ComposedJSONSchema } from './types';
import getAuditJSONSchema from './get-audit-json-schema';
import getVersionJSONSchema from './get-version-json-schema';

export default function getComposedValidator(
  appJSONSchema: AppJSONSchema,
): ComposedJSONSchema {
  return {
    $jsonSchema: {
      allOf: [
        appJSONSchema,
        getVersionJSONSchema(appJSONSchema.version),
        getAuditJSONSchema(),
      ],
    },
  };
}
