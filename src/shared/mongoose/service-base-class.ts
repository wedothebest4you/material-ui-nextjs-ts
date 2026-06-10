import monggose, { Error } from 'mongoose';
import { SchemaOperationError } from '@/src/shared';
import { SchemaDatabseError } from '@/src/shared';
import CustomError from '@/shared/errors/custom-error';

export default class ServiceBase {
  static customError: typeof CustomError;
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
      next(
        CustomError.createCustomError(
          500,
          'Internal Server Error',
          (err && err.message) || 'An unexpected error occurred.',
        ),
      );
    }
  }
}
