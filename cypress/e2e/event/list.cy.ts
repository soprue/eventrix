describe('이벤트 목록 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('이벤트 목록을 불러올 때 스켈레톤 리스트가 먼저 보여진다.', () => {
    cy.get('[data-cy="skeletonList"]').should('be.visible');
    cy.get('[data-cy="skeletonList"]').should('not.exist');
    cy.get('[data-cy="eventList"]').should('be.visible');
  });

  it('이벤트 목록이 정상적으로 불러와진다.', () => {
    cy.get('[data-cy="eventList"]')
      .first()
      .find('[data-cy="eventBox"]')
      .should('have.length.at.least', 1);

    cy.get('[data-cy="eventBox"]').each(box => {
      cy.wrap(box).find('[data-cy="eventTitle"]').should('not.be.empty');
      cy.wrap(box).find('[data-cy="eventThumbnail"]').should('be.visible');
      cy.wrap(box).find('[data-cy="eventCategory"]').should('not.be.empty');
      cy.wrap(box).find('[data-cy="eventStatus"]').should('not.be.empty');
      cy.wrap(box).find('[data-cy="eventLikesCount"]').should('not.be.empty');
    });
  });

  it('이벤트가 충분할 때 무한 스크롤이 동작한다.', () => {
    cy.get('[data-cy="eventBox"]').then(initialEvents => {
      const initialCount = initialEvents.length;

      if (initialCount >= 12) {
        cy.scrollTo('bottom');
        cy.get('[data-cy="eventBox"]')
          .its('length')
          .should('be.gt', initialCount);
      } else {
        cy.log('이벤트 수가 12개 미만이어서 테스트를 실행하지 않습니다.');
      }
    });
  });

  it('필터 옵션으로 이벤트를 필터링 할 수 있다.', () => {
    cy.get('[data-cy="filterButton-카테고리"]').first().click();
    cy.get('[data-cy="filterModal-카테고리"]').should('be.visible');
    cy.contains('금융').click();
    cy.contains('금융').should('have.class', 'border-primary');
    cy.get('[data-cy="applyFilter"]').click();

    cy.get('[data-cy="eventBox"]').each(box => {
      cy.wrap(box)
        .find('[data-cy="eventCategory"]')
        .should('have.text', '금융');
    });
  });

  it('인기순으로 이벤트 목록을 정렬할 수 있다.', () => {
    cy.get('[data-cy=sortButton]').click();
    cy.get('[data-cy=sortButton-인기순]').click();

    cy.get('[data-cy=eventBox]')
      .find('[data-cy=eventLikesCount]')
      .then($likes => {
        const likesArray = $likes
          .map((_, html) => Number(Cypress.$(html).text()))
          .get();
        expect(isSortedDescending(likesArray)).to.be.true;
      });
  });

  it('이벤트 박스를 클릭하면 이벤트 상세 페이지로 이동한다.', () => {
    cy.get('[data-cy=eventBox]').first().click();
    cy.url().should('include', '/event/');
  });
});

function isSortedDescending(array: number[]) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < array[i + 1]) {
      return false;
    }
  }
  return true;
}
