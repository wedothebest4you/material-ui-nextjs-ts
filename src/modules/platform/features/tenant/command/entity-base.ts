import monggose, { Error } from 'mongoose';
import { SchemaOperationError } from '@/src/shared';
import { SchemaDatabseError } from '@/src/shared';

export default class EntityBase {
  async onPostSave(
    err: Error.ValidationError | monggose.mongo.MongoServerError | Error,
    doc: any,
    next: any,
  ) {
    if (err instanceof Error.ValidationError) {
      next(new SchemaOperationError(err));
    } else if (err instanceof monggose.mongo.MongoServerError) {
      next(new SchemaDatabseError(err));
    } else {
      next({
        errorCode: 500,
        errorMessage: 'Internal Server Error',
        errorDetails: [
          {
            message: (err && err.message) || 'An unexpected error occurred.',
            kind: 'internal',
          },
        ],
      });
    }
  }
}
