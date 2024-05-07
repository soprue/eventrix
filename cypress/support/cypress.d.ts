declare namespace Cypress {
  interface Chainable {
    conditionalLogout(): Promise<void>;
  }
}
