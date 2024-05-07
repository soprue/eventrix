import { user } from '../../fixtures/user';

describe('로그인 테스트', () => {
  const { buyer } = user;

  beforeEach(() => {
    // Given - 로그인 페이지로 접속한다.
    cy.visit('/signin');

    cy.get('input[name="email"]').as('emailInput');
    cy.get('input[name="password"]').as('passwordInput');
    cy.get('[data-cy="signInButton"]').as('signinButton').should('be.disabled');
  });

  it('이메일 형식에 맞지 않는 값을 입력하고 로그인을 시도하면 에러 메시지를 보여 준다.', () => {
    // When - 유효하지 않은 이메일 형식으로 로그인을 시도한다.
    cy.get('@emailInput').type('test');
    cy.get('@passwordInput').type(buyer.password);

    cy.get('@signinButton').should('not.be.disabled');
    cy.get('@signinButton').click();

    // Then - Alert로 에러 메시지를 보여 준다.
    cy.get('[data-cy="alertDialogDescription"]').should(
      'contain',
      '유효하지 않은 이메일 형식입니다.',
    );
  });

  it('옳지 않은 이메일과 비밀번호로 로그인을 시도하면 에러 메시지를 보여 준다.', () => {
    // When - 유효하지 않은 이메일 형식으로 로그인을 시도한다.
    cy.get('@emailInput').type(buyer.email);
    cy.get('@passwordInput').type(buyer.password + '1');

    cy.get('@signinButton').should('not.be.disabled');
    cy.get('@signinButton').click();

    // Then - Alert로 에러 메시지를 보여 준다.
    cy.get('[data-cy="alertDialogDescription"]').should(
      'contain',
      '이메일과 비밀번호가 일치하지 않습니다.',
    );
  });

  it('로그인에 성공하면 메인 페이지로 이동한다.', () => {
    // When - 올바른 이메일과 비밀번호로 로그인을 시도한다.
    cy.get('@emailInput').type(buyer.email);
    cy.get('@passwordInput').type(buyer.password);

    cy.get('@signinButton').should('not.be.disabled');
    cy.get('@signinButton').click();

    // Then - 홈 화면으로 이동한다.
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  afterEach(() => {
    cy.firebaseLogout();
  });
});
