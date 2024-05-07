declare namespace Cypress {
  interface Chainable {
    firebaseLogout(): Promise<void>;
  }
}
