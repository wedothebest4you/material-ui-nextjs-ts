import { Error as MongooseError } from 'mongoose';
import { MongoServerError } from 'mongodb';

export default class SchemaOperationError extends Error {
  errorDetails = '';
  errorBypassed: boolean = false;
  constructor(
    private error: Error,
    private next: (error: Error) => void,
  ) {
    super();

    // 2. Guard for Mongoose native validation issues
    if (this.error instanceof MongooseError.ValidationError) {
      const errorDetails = Object.values(this.error.errors).map(
        (e) => `${e.path}: ${e.message}`,
      );
      this.errorDetails = `Validation Failed: ${errorDetails.join(', ')}`;
      return;
    }

    // 3. Guard for MongoDB Server Constraint Violations (like Unique Keys)
    if (this.error instanceof MongoServerError && this.error.code === 11000) {
      // Safely type-cast the error to inspect key-value duplicates securely
      const serverError = this.error as MongoServerError & {
        keyValue?: Record<string, string>;
      };
      const duplicatedField = serverError.keyValue
        ? Object.keys(serverError.keyValue)[0]
        : 'field';
      this.errorDetails = `The provided ${duplicatedField} is already registered.`;
      return;
    }

    // 4. Guard for Malformed MongoDB ObjectIDs / Type Casting issues
    if (this.error instanceof MongooseError.CastError) {
      this.errorDetails = `Invalid value given for path: ${this.error.path}`;
      return;
    }

    // 5. Fallback for unhandled native/generic JavaScript Errors
    this.errorBypassed = false;
  }
}
