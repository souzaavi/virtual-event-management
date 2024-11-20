class CustomError extends Error {
  /**
   * Custom Error class to handle errors.
   * @param {number} statusCode - HTTP status code.
   * @param {string[]} errors - Array of error messages.
   * @extends Error
   */
  constructor(statusCode, errors) {
    super(errors.join(', '));
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

module.exports = CustomError;
