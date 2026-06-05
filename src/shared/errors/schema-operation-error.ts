import { Error } from 'mongoose';
import CustomError from './custom-error';

export default class SchemaOperationError extends CustomError {
  override errorCode: number;
  override errorMessage: string;
  override errorDetails: { message: string; path?: string; kind?: string }[];

  constructor(err: Error.ValidationError) {
    super();

    const rawPayload = {
      errorCode: 400,
      errorMessage: 'Validation or Cast Errors occured',
      errorDetails: Object.values(err.errors),
    };

    // dropping the key 'value'
    const jsonString = JSON.stringify(rawPayload, (key, val) => {
      if (key === 'value') return undefined;
      return val;
    });

    const parsedErr = JSON.parse(jsonString) as typeof rawPayload;
    this.errorCode = parsedErr.errorCode;
    this.errorMessage = parsedErr.errorMessage;
    this.errorDetails = parsedErr.errorDetails;
  }
}
