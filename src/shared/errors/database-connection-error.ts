import CustomError from './custom-error';

export default class DatabaseConnectionError extends CustomError {
  errorCode = 0;
  errorMessage = '';
  errorDetails = [{ message: '', path: '', kind: '' }];

  constructor() {
    super();
  }
}
