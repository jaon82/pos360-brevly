export class ExistingLinkError extends Error {
  constructor() {
    super("Link encurtado já utilizado.");
  }
}
