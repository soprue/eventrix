/// <reference types="cypress" />

import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './index.ts';

Cypress.Commands.add('firebaseLogout', () => {
  const auth = getAuth(app);
  return signOut(auth);
});

Cypress.Commands.add('firebaseLogin', (email: string, password: string) => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password);
});
