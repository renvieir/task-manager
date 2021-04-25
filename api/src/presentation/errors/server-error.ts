export class ServerError extends Error {
  error: Error;
  constructor(error: Error) {
    super("Internal server error");
    this.error = error;
  }
}
