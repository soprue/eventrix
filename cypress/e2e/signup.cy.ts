const { user } = require('../fixtures/user');

describe('회원가입 테스트', () => {
  const { buyer } = user;

  beforeEach(() => {
    // Given - 회원가입 페이지로 접속한다.
    cy.conditionalLogout();
    cy.visit('/signup');

    cy.get('input[name="userType"]').as('userTypeInput');
    cy.get('input[name="email"]').as('emailInput');
    cy.get('input[name="nickname"]').as('nicknameInput');
    cy.get('input[name="password"]').as('passwordInput').should('be.visible');
    cy.get('input[name="passwordConfirm"]').as('passwordConfirmInput');
    cy.get('input[name="phone"]').as('phoneInput');
    cy.get('[data-cy="signupButton"]').as('signupButton').should('be.disabled');
  });

  it('사용자는 이메일과 비밀번호를 사용해서 회원가입 한다.', () => {
    // When - 사용자 유형, 이메일, 닉네임, 비밀번호, 비밀번호 확인, 전화번호를 입력하고 회원가입 버튼을 클릭한다.
    cy.get('@userTypeInput').check(buyer.userType);
    cy.get('@emailInput').type(buyer.email);
    cy.get('@nicknameInput').type(buyer.nickname);
    cy.get('@passwordInput').type(buyer.password);
    cy.get('@passwordConfirmInput').type(buyer.password);
    cy.get('@phoneInput').type(buyer.phone);

    cy.get('@signupButton').should('not.be.disabled');
    cy.get('@signupButton').click();

    // Then - 회원가입이 완료되고 메인 페이지로 이동한다.
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('[data-cy="alertDialogTitle"]').should('contain', '환영합니다!');
  });

  it('이미 사용 중인 이메일로 가입을 시도하면 에러 메시지를 보여 준다.', () => {
    // When - 이미 사용 중인 이메일로 회원가입을 시도한다.
    cy.get('@userTypeInput').check(buyer.userType);
    cy.get('@emailInput').type('test@test.com');
    cy.get('@nicknameInput').type(buyer.nickname);
    cy.get('@passwordInput').type(buyer.password);
    cy.get('@passwordConfirmInput').type(buyer.password);
    cy.get('@phoneInput').type(buyer.phone);

    cy.get('@signupButton').should('not.be.disabled');
    cy.get('@signupButton').click();

    // Then - Alert로 에러 메시지를 보여 준다.
    cy.get('[data-cy="alertDialogTitle"]').should(
      'contain',
      '다시 시도해 주세요.',
    );
  });
});
