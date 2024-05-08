declare namespace Cypress {
  interface Chainable {
    firebaseLogout(): Promise<void>;
    firebaseLogin(email: string, password: string): Promise<UserCredential>;
  }
}
