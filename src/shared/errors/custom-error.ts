import { setPrototypeFix } from '../jsquirks/subclass-built-in-class';

export default abstract class CustomError extends Error {
  abstract errorCode: number;
  abstract errorMessage: string;
  abstract errorDetails: {
    message: string;
    path?: string;
    kind?: string;
  }[];
  constructor() {
    super();
    setPrototypeFix(this);
  }
}
