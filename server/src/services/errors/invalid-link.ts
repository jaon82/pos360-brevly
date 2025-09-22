export class InvalidLinkError extends Error {
  constructor() {
    super("Informe uma URL minúscula e sem espaço/caracter especial.");
  }
}
