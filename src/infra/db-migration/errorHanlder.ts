import { MongoServerError } from './types';
export default function logError(errorContext: string, err?: unknown) {
  console.error(`\x1b[31m Migration failed: ${errorContext}\x1b[0m`);
  if (err instanceof MongoServerError) {
    if (err.code === 11000) {
      console.error('Key duplicated');
    }
  }
  // MongoServerError is also an Error, so this still logs the original message
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error(err);
  }
}
