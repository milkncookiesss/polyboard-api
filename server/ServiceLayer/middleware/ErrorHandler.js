// -------------------------------------------------------------------------- //
/**
 * Polyboard Error Handling base Class.
 * 
 * @property errorCode  
 * @property message    
 * @property statusCode 
*/
export class PolyBoardError extends Error {
  constructor(errorCode, message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.status = statusCode || 500;
    this.message = message;
    this.error = errorCode;
  }
}

// -------------------------------------------------------------------------- //
/**
 * 
*/
export class RequestValidationError extends PolyBoardError {
  constructor(errorCode, message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.error = errorCode;
    this.status = statusCode || 500;
    this.message = message;
  }
}
