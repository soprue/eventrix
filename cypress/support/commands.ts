/// <reference types="cypress" />

import { getAuth, signOut } from 'firebase/auth';
import { app } from './index.ts';

Cypress.Commands.add('firebaseLogout', () => {
  const auth = getAuth(app);
  return signOut(auth);
});
