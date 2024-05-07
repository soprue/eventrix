/// <reference types="cypress" />

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './index.ts';

Cypress.Commands.add('conditionalLogout', () => {
  const auth = getAuth(app);
  return new Promise<void>((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        signOut(auth)
          .then(() => resolve())
          .catch(error => reject(error));
      } else {
        resolve();
      }
    });
  });
});
