import monggose from 'mongoose';
import CustomError from './custom-error';

export default class SchemaDatabaseError extends CustomError {
  override errorCode!: number;
  override errorMessage!: string;
  override errorDetails!: { message: string; path?: string; kind?: string }[];

  constructor(err: monggose.mongo.MongoServerError) {
    super();
    const hasKeys = err.keyValue && typeof err.keyValue === 'object';
    // const fallbackPath = hasKeys ? Object.keys(err.keyValue)[0] : 'database';
    switch (err.code) {
      case 11000: {
        ((this.errorCode = 409),
          (this.errorMessage = 'Conflict: Unique constraint failed.'),
          (this.errorDetails = [
            {
              message: `${hasKeys} already exists.`,
              kind: 'unique',
            },
          ]));
      }
      case 13: {
        ((this.errorCode = 403),
          (this.errorMessage = 'Database permission denied.'),
          (this.errorDetails = [
            {
              message: 'Unauthorized database operation.',
              kind: 'forbidden',
            },
          ]));
      }
      default: {
        this.errorCode = 500;
        ((this.errorMessage = `Database execution failed.`),
          (this.errorDetails = [
            {
              message: `Database error code: ${err.code}`,
              kind: 'server',
            },
          ]));
      }
    }
  }
}
