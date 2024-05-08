import { user } from 'cypress/fixtures/user';

describe('로그아웃 테스트', () => {
  const { buyer } = user;

  beforeEach(() => {
    // Given - 사용자가 로그인된 상태로 앱에 접속한다.
    cy.firebaseLogin(buyer.email, buyer.password);
    cy.visit('/');
  });

  it('로그아웃 버튼을 클릭하면 로그아웃이 되어야 한다.', () => {
    // When - 사용자 드롭다운 메뉴를 열고 로그아웃 버튼을 클릭한다.
    cy.get('[data-cy="user-drop-down-menu"]', { timeout: 100000 })
      .should('be.visible')
      .click();
    cy.get('[data-cy="signout-button"]').click();

    // Then - 로그아웃 후 사용자 드롭다운 메뉴가 사라지고 로그인 버튼이 나타난다.
    cy.get('[data-cy="user-drop-down-menu"]').should('not.exist');
    cy.get('a').contains('로그인').should('be.visible');
  });
});
