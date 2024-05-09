import { user } from 'cypress/fixtures/user';

describe('비회원 라우트 접근 테스트', () => {
  const { buyer, organizer } = user;

  const publicRoutes = ['/signin', '/signup'];
  const privateRoutes = ['/mypage'];
  const privateBuyerRoutes = [
    '/register/:id',
    '/cart',
    '/payment',
    '/mypage/likes',
    '/mypage/tickets',
  ];
  const privateOrganizerRoutes = [
    '/mypage/events',
    '/mypage/events/new',
    '/mypage/events/edit',
    '/mypage/management',
  ];

  context('비회원 접근 테스트', () => {
    publicRoutes.forEach(route => {
      it(`${route} 페이지는 비로그인 상태에서 접근 가능해야 한다.`, () => {
        cy.visit(route);
        cy.url().should('include', route);
      });
    });

    [privateRoutes, privateBuyerRoutes, privateOrganizerRoutes]
      .flat()
      .forEach(route => {
        it(`${route} 페이지는 비로그인 상태에서 접근 불가해야 한다.`, () => {
          cy.visit(route);
          cy.url().should('not.include', route);
          cy.url().should('include', '/signin');
        });
      });
  });

  context('"참여자" 사용자 접근 테스트', () => {
    beforeEach(() => {
      cy.firebaseLogin(buyer.email, buyer.password);
    });

    privateRoutes.concat(privateBuyerRoutes).forEach(route => {
      it(`${route} 페이지는 buyer로 로그인한 사용자가 접근 가능해야 한다.`, () => {
        cy.visit(route);
        cy.url().should('include', route);
      });
    });

    privateOrganizerRoutes.forEach(route => {
      it(`${route} 페이지는 buyer로 로그인한 사용자가 접근 불가해야 한다.`, () => {
        cy.visit(route);
        cy.url().should('not.include', route);
      });
    });
  });

  context('"주최자" 사용자 접근 테스트', () => {
    beforeEach(() => {
      cy.firebaseLogin(organizer.email, organizer.password);
    });

    privateRoutes.concat(privateOrganizerRoutes).forEach(route => {
      it(`${route} 페이지는 organizer로 로그인한 사용자가 접근 가능해야 한다.`, () => {
        cy.visit(route);
        cy.url().should('include', route);
      });
    });

    privateBuyerRoutes.forEach(route => {
      it(`${route} 페이지는 organizer로 로그인한 사용자가 접근 불가해야 한다.`, () => {
        cy.visit(route);
        cy.url().should('not.include', route);
      });
    });
  });

  afterEach(() => {
    cy.firebaseLogout();
  });
});
