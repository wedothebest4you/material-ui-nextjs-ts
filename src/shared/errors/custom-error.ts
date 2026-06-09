import { setPrototypeFix } from '../jsquirks/subclass-built-in-class';
type ErrorDetails = {
  message: string;
  path?: string;
  kind?: string;
};

export default abstract class CustomError extends Error {
  abstract errorCode: number;
  abstract errorMessage: string;
  abstract errorDetails: ErrorDetails[];
  constructor() {
    super();
    setPrototypeFix(this);
  }
  static getCustomErrorClass(): new (
    errCode: number,
    errMsg: string,
    errDtl: ErrorDetails,
  ) => CustomError {
    return class CustomErrorClass extends CustomError {
      override errorCode!: number;
      override errorMessage!: string;
      override errorDetails!: ErrorDetails[];

      constructor(errCode: number, errMsg: string, errDtl: ErrorDetails) {
        super();
        this.errorCode = errCode;
        this.errorMessage = errMsg;
        this.errorDetails = [errDtl];
      }
    };
  }
  static createCustomError(
    errCode: number,
    errShortMsg: string,
    errDtl: string,
  ) {
    const customErrorclass = this.getCustomErrorClass();
    return new customErrorclass(errCode, errShortMsg, { message: errDtl });
  }
}
