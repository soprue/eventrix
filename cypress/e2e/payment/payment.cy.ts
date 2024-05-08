import { user } from 'cypress/fixtures/user';

describe('결제 페이지 테스트', () => {
  const { buyer } = user;

  beforeEach(() => {
    cy.firebaseLogin(buyer.email, buyer.password);
    cy.visit('/');
  });

  it('결제 페이지로 이동할 수 있다.', () => {
    cy.get('[data-cy="event-list"]')
      .first()
      .within(() => {
        cy.get('[data-cy="event-box"]')
          .contains('[data-cy="event-status"]', '모집 진행')
          .first()
          .click();
      });
    cy.get('[data-cy="join-button"]').click();
    cy.url().should('include', '/register/');

    cy.get('[data-cy="ticket-option-input"]').first().click();
    cy.get('[data-cy="ticket-quantity-trigger"]').click();
    cy.get('[data-cy="ticket-quantity-item"]').first().click();
    cy.get('[data-cy="register-pay-button"]').click();
    cy.url().should('include', '/payment');
  });

  it('결제 페이지에서 결제를 진행할 수 있다.', () => {
    cy.get('[data-cy="event-list"]')
      .first()
      .within(() => {
        cy.get('[data-cy="event-box"]')
          .contains('[data-cy="event-status"]', '모집 진행')
          .first()
          .click();
      });
    cy.get('[data-cy="join-button"]').click();
    cy.url().should('include', '/register/');

    cy.get('[data-cy="ticket-option-input"]').first().click();
    cy.get('[data-cy="ticket-quantity-trigger"]').click();
    cy.get('[data-cy="ticket-quantity-item"]').first().click();
    cy.get('[data-cy="register-pay-button"]').click();
    cy.url().should('include', '/payment');

    cy.get('[data-cy="payment-submit-button"]').click();
    cy.get('[data-cy="payment-done"]').should('exist');
  });
});
