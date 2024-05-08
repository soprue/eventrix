import { user } from 'cypress/fixtures/user';

describe('이벤트 상세 페이지 테스트', () => {
  const { buyer } = user;

  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="event-list"]')
      .first()
      .within(() => {
        cy.get('[data-cy="event-box"]')
          .contains('[data-cy="event-status"]', '모집 진행')
          .first()
          .click();
      });
  });

  it('이벤트 상세 페이지가 정상적으로 렌더링된다.', () => {
    cy.get('[data-cy="event-detail"]').should('be.visible');
    cy.get('[data-cy="event-thumbnail"]').should('be.visible');
    cy.get('[data-cy="event-name"]').should('be.visible');
    cy.get('[data-cy="error-box"]').should('not.exist');
    cy.get('[data-cy="join-button"]').should('be.visible');
  });

  it('로그인한 "참여자" 사용자는 찜하기 버튼을 볼 수 있다.', () => {
    cy.firebaseLogin(buyer.email, buyer.password);

    cy.get(
      '[data-cy="like-button-unliked"], [data-cy="like-button-liked"]',
    ).should('be.visible');
  });

  it("로그인한 '참여자' 사용자는 찜하기 버튼을 클릭할 수 있다.", () => {
    cy.firebaseLogin(buyer.email, buyer.password);

    cy.get(
      '[data-cy="like-button-unliked"], [data-cy="like-button-liked"]',
    ).then($btn => {
      const isLiked = $btn.attr('data-cy') === 'like-button-liked';

      cy.wrap($btn).click();

      if (isLiked) {
        cy.get('[data-cy="like-button-unliked"]').should('be.visible');
      } else {
        cy.get('[data-cy="like-button-liked"]').should('be.visible');
      }
    });
  });

  it('로그인한 "참여자" 사용자는 모집 진행 중인 이벤트일 경우 참여하기 버튼을 클릭할 수 있다.', () => {
    cy.firebaseLogin(buyer.email, buyer.password);

    cy.get('[data-cy="join-button"]').click();
    cy.url().should('include', '/register/');
  });
});
