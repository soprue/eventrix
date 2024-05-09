import { user } from 'cypress/fixtures/user';

describe('장바구니 페이지 테스트', () => {
  const { buyer } = user;

  beforeEach(() => {
    cy.firebaseLogin(buyer.email, buyer.password);
    cy.visit('/');

    cy.get('[data-cy="user-drop-down-menu"]', { timeout: 100000 })
      .should('be.visible')
      .click();
    cy.get('[data-cy="cart-button"]', { timeout: 100000 })
      .should('be.visible')
      .click();
  });

  it('"참여자" 사용자는 장바구니에 이벤트를 추가할 수 있다.', () => {
    cy.visit('/');
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
    cy.get('[data-cy="register-cart-button"]').click();
    cy.url().should('include', '/cart');
    cy.get('[data-cy="cart-list"]').should('be.visible');
    cy.get('[data-cy="cart-box"]').should('be.visible');
  });

  it('"참여자" 사용자는 장바구니에 담긴 티켓의 수량을 조절할 수 있다.', () => {
    cy.get('[data-cy="cart-box"]')
      .first()
      .within(() => {
        cy.get('[data-cy="ticket-quantity-display"]')
          .invoke('text')
          .then(initialQuantity => {
            cy.get('[data-cy="ticket-quantity-trigger"]').click();
            cy.get('[data-cy="ticket-quantity-item"]').last().click();

            cy.get('[data-cy="ticket-quantity-display"]').should($display => {
              const updatedQuantity = $display.text();
              expect(updatedQuantity).not.to.equal(initialQuantity);
            });
          });
      });
  });

  it('"참여자" 사용자는 장바구니에 담긴 상품을 삭제할 수 있다.', () => {
    cy.get('[data-cy="cart-box"]')
      .first()
      .within(() => {
        cy.get('[data-cy="cart-checkbox"]').click();
      });
    cy.get('[data-cy="cart-box"]').should('not.exist');
  });

  it('"참여자" 사용자는 장바구니에서 티켓을 선택하여 구매할 수 있다.', () => {
    cy.get('[data-cy="cart-checkbox"]').click();
    cy.get('[data-cy="cart-pay-button"]').click();
    cy.url().should('include', '/payment');
  });
});
