import { user } from '../../fixtures/user';

describe('회원가입 테스트', () => {
  const { buyer } = user;

  beforeEach(() => {
    // Given - 회원가입 페이지로 접속한다.
    cy.visit('/signup');

    cy.get('input[name="userType"]').as('userTypeInput');
    cy.get('input[name="email"]').as('emailInput');
    cy.get('input[name="nickname"]').as('nicknameInput');
    cy.get('input[name="password"]').as('passwordInput').should('be.visible');
    cy.get('input[name="passwordConfirm"]').as('passwordConfirmInput');
    cy.get('input[name="phone"]').as('phoneInput');
    cy.get('[data-cy="signupButton"]').as('signupButton').should('be.disabled');
  });

  it('잘못된 이메일 형식 입력 시 에러 메시지가 나타난다.', () => {
    // When - 이메일 인풋에 유효하지 않은 이메일을 입력한다.
    cy.get('@emailInput').type('test');

    // Then - 에러 메시지를 보여 준다.
    cy.get('[data-cy="emailHelperText"]').should(
      'contain',
      '유효하지 않은 이메일 주소입니다.',
    );
  });

  it('잘못된 비밀번호 형식(글자 수) 입력 시 에러 메시지가 나타난다.', () => {
    // When - 8자 이하의 비밀번호를 인풋에 입력한다.
    cy.get('@passwordInput').type('test');

    // Then - 에러 메시지를 보여 준다.
    cy.get('[data-cy="passwordHelperText"]').should(
      'contain',
      '비밀번호는 최소 8자 이상이어야 합니다.',
    );
  });

  it('잘못된 비밀번호 형식(조합) 입력 시 에러 메시지가 나타난다.', () => {
    // When - 조합에 맞지 않는 비밀번호를 인풋에 입력한다.
    cy.get('@passwordInput').type('testtest');

    // Then - 에러 메시지를 보여 준다.
    cy.get('[data-cy="passwordHelperText"]').should(
      'contain',
      '비밀번호는 대문자, 소문자, 숫자, 특수문자 중 3종류를 포함해야 합니다.',
    );
  });

  it('비밀번호와 비밀번호 확인이 일치하지 않을 때 에러 메시지가 나타난다.', () => {
    // When - 비밀번호와 일치하지 않는 문자열을 인풋에 입력한다.
    cy.get('@passwordInput').type(buyer.password);
    cy.get('@passwordConfirmInput').type('testtest1');

    // Then - 에러 메시지를 보여 준다.
    cy.get('[data-cy="passwordConfirmHelperText"]').should(
      'contain',
      '비밀번호가 일치하지 않습니다.',
    );
  });

  it('전화번호에 숫자 이외의 문자가 포함되어 있을 때 에러 메시지가 나타난다.', () => {
    // When - 전화번호에 숫자 이외의 문자를 인풋에 입력한다.
    cy.get('@phoneInput').type('0101234567a');

    // Then - 에러 메시지를 보여 준다.
    cy.get('[data-cy="phoneHelperText"]').should(
      'contain',
      '전화번호는 숫자만 포함해야 합니다.',
    );
  });

  it('전화번호가 10자리 미만일 때 에러 메시지가 나타난다.', () => {
    // When - 전화번호에 10자리 미만의 숫자를 인풋에 입력한다.
    cy.get('@phoneInput').type('010123456');

    // Then - 에러 메시지를 보여 준다.
    cy.get('[data-cy="phoneHelperText"]').should(
      'contain',
      '전화번호는 최소 10자 이상이어야 합니다.',
    );
  });

  it('회원가입에 성공하면 메인 페이지로 이동한다.', () => {
    // When - 사용자 유형, 이메일, 닉네임, 비밀번호, 비밀번호 확인, 전화번호를 입력하고 회원가입 버튼을 클릭한다.
    cy.get('@userTypeInput').check(buyer.userType, { force: true });
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

  afterEach(() => {
    cy.firebaseLogout();
  });
});
