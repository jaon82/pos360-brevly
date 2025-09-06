export class NotFoundError extends Error {
  constructor() {
    super("Link não encontrado.");
  }
}
