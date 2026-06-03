import { setPrototypeFix } from '@/shared/jsquirks/subclass-built-in-class';

export default abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor() {
    super();
    setPrototypeFix(this);
  }
  abstract serializeErrors(): {
    kind: string;
    message: string;
    field?: string;
  }[];
}
