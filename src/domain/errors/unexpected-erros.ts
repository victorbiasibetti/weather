export class UnexpectedError extends Error {
  constructor() {
    super("Check your params and try again.");
    this.name = "UnexpectedError";
  }
}
