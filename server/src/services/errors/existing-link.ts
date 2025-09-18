export class ExistingLinkError extends Error {
  constructor() {
    super("Essa URL encurtada já existe.");
  }
}
